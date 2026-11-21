import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowRight, Building2, Camera, CheckCircle2, ChevronRight, CircleHelp, Code2, Eye, EyeOff, Layers3, ListTodo, Pause, Play, Plus, RefreshCw, RotateCcw, ServerOff, Sparkles, Users, X } from 'lucide-react';
import { WorldScene } from './components/WorldScene';
import { agents } from './data/agents';
import { createDemoTask, getTasks, type DemoTask } from './lib/api';
import { useWorldUi } from './lib/store';

type Tab = 'world' | 'tasks';
export default function App() {
  const [tab,setTab] = useState<Tab>('world');
  const [tasks,setTasks] = useState<DemoTask[]>([]);
  const [serverOnline,setServerOnline] = useState(false);
  const [title,setTitle] = useState('Rancang homepage produk AI');
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [pickedTask,setPickedTask] = useState<string|null>(null);
  const selectedId=useWorldUi(s=>s.selectedAgent);
  const select=useWorldUi(s=>s.setSelectedAgent);
  const camera=useWorldUi(s=>s.cameraMode);
  const setCamera=useWorldUi(s=>s.setCameraMode);
  const showRoof=useWorldUi(s=>s.showRoof);
  const toggleRoof=useWorldUi(s=>s.toggleRoof);
  const paused=useWorldUi(s=>s.paused);
  const togglePause=useWorldUi(s=>s.togglePause);
  const agent=agents.find(a=>a.id===selectedId);
  const chosenTask=tasks.find(t=>t.id===pickedTask);
  const active=tasks.filter(t=>t.status==='queued'||t.status==='running').length;
  const completed=tasks.filter(t=>t.status==='demo_completed').length;
  const refresh=async () => { try {const data=await getTasks();setTasks(data);setServerOnline(true)} catch {setServerOnline(false)} };
  useEffect(()=>{
    void refresh();
    const events=new EventSource('/api/events');
    events.addEventListener('task',()=>void refresh());
    const timer=window.setInterval(()=>void refresh(),7000);
    return()=>{events.close();window.clearInterval(timer)};
  },[]);
  const taskForAgent=useMemo(()=>tasks.find(t=>t.agentId===selectedId&&(t.status==='running'||t.status==='queued')), [tasks,selectedId]);
  async function submit() {
    if(!title.trim() || busy || !serverOnline) return;
    setBusy(true);setError('');
    try {const task=await createDemoTask(title,selectedId||agents[0].id);setPickedTask(task.id);setTab('tasks');await refresh();}
    catch(e){setError(e instanceof Error?e.message:'Cannot create task')}
    finally {setBusy(false)}
  }
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon"><Sparkles size={20}/></span><span><strong>Living World</strong><small>AI AGENT CAMPUS</small></span></div>
      <p className="section-caption">WORKSPACE</p>
      <button className={'nav '+(tab==='world'?'active':'')} onClick={()=>setTab('world')}><Layers3 size={18}/> World Overview <ChevronRight className="nav-arrow" size={15}/></button>
      <button className={'nav '+(tab==='tasks'?'active':'')} onClick={()=>setTab('tasks')}><ListTodo size={18}/> Tasks <span className="small-count">{tasks.length}</span></button>
      <p className="section-caption nav-subtitle">COMING IN NEXT PHASES</p>
      <div className="nav disabled"><Users size={18}/> Teams <small>Planned</small></div>
      <div className="nav disabled"><Building2 size={18}/> Build Mode <small>Planned</small></div>
      <div className="nav disabled"><Activity size={18}/> Analytics <small>Planned</small></div>
      <div className="sidebar-foot"><span className="dot amber"/> <div><strong>Demo environment</strong><span>No LLM connected</span></div><CircleHelp size={16}/></div>
    </aside>
    <main className="main">
      <header className="header"><div className="header-title"><span className="eyebrow">WORKSPACE / {tab==='world'?'WORLD':'TASKS'}</span><h1>{tab==='world'?'Campus Overview':'Task Center'}</h1></div><div className="header-right"><span className="pill safe"><span className="dot amber"/> DEMO MODE</span><span className={'server-badge '+(serverOnline?'online':'offline')}>{serverOnline?<CheckCircle2 size={15}/>:<ServerOff size={15}/>} {serverOnline?'API connected':'API offline'}</span><span className="profile">LW</span></div></header>
      <div className="status-strip"><div className="stat"><span>AI AGENTS</span><strong>10 <small>visual</small></strong></div><div className="stat"><span>DEMO TASKS RUNNING</span><strong>{active}</strong></div><div className="stat"><span>DEMO TASKS FINISHED</span><strong>{completed}</strong></div><div className="stat"><span>LIVE LLM CALLS</span><strong>0 <small>not configured</small></strong></div></div>
      <div className="workspace">
        <section className="scene-wrap">
          <WorldScene/>
          <div className="scene-top"><span className="scene-tag"><span className="dot green"/> {tab==='world'?'CAMPUS • INTERACTIVE 3D':'CAMPUS • LIVE VISUALIZATION'}</span><span className="scene-hint">Drag to orbit · Scroll to zoom</span></div>
          <div className="scene-bottom"><div className="scene-controls"><button title="Isometric view" className={camera==='isometric'?'selected':''} onClick={()=>setCamera('isometric')}><Camera size={16}/> Isometric</button><button title="Top-down view" className={camera==='top'?'selected':''} onClick={()=>setCamera('top')}><RotateCcw size={16}/> Top</button><button title="Toggle roof" className={showRoof?'selected':''} onClick={toggleRoof}>{showRoof?<Eye size={16}/>:<EyeOff size={16}/>} Roof</button><button title="Toggle avatar simulation" onClick={togglePause}>{paused?<Play size={16}/>:<Pause size={16}/>} {paused?'Resume':'Pause'}</button></div><span className="scene-help">Select a character to inspect</span></div>
        </section>
        <aside className="detail">
        {tab==='tasks'?<>
          <div className="detail-head"><div><span className="eyebrow">TASK ORCHESTRATION</span><h2>Demo tasks</h2></div><button className="icon-btn" title="Refresh tasks" onClick={()=>void refresh()}><RefreshCw size={17}/></button></div>
          <p className="explainer">These are persisted, simulated task transitions. <strong>No LLM or tools are invoked.</strong></p>
          <label className="input-label" htmlFor="task-title">New demo task</label><input id="task-title" maxLength={200} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Describe a task"/>
          <div className="task-agent">Assigned to <strong>{agent?.name || 'Nova'}</strong>. Select an avatar to change.</div>
          <button className="primary-btn" disabled={!serverOnline||busy||!title.trim()} onClick={()=>void submit()}><Plus size={16}/> {busy?'Creating...':'Simulate task'}</button>
          {error&&<p className="error">{error}</p>}
          <div className="divider-line"/><p className="input-label">Recent demo tasks ({tasks.length})</p>
          <div className="task-list">{tasks.length===0?<p className="empty">No tasks yet. Start a demo to see event-based transitions.</p>:tasks.map(t=><button key={t.id} className={'task-item '+(pickedTask===t.id?'picked':'')} onClick={()=>setPickedTask(t.id)}><span className="task-title">{t.title}</span><small>{agents.find(a=>a.id===t.agentId)?.name||t.agentId} · {t.status.replace('_',' ')}</small><span className="task-mode">SIMULATED</span></button>)}</div>
          {chosenTask && <div className="artifact"><strong>Selected task</strong><span>{chosenTask.status}</span>{chosenTask.artifact&&<p>{chosenTask.artifact.content}</p>}</div>}
        </>:<>
          <div className="detail-head"><div><span className="eyebrow">CHARACTER INSPECTOR</span><h2>{agent?'Agent Profile':'Discover Agents'}</h2></div>{agent?<button className="icon-btn" title="Close" onClick={()=>select(null)}><X size={17}/></button>:<Users size={19}/>}</div>
          {agent?<><div className="agent-profile"><div className="agent-avatar" style={{background:agent.color}}>{agent.name.slice(0,1)}</div><h3>{agent.name}</h3><p>{agent.role}</p><span className="pill muted">3D avatar · Demo only</span></div>
            <div className="info-row"><span>Team</span><strong>{agent.team}</strong></div><div className="info-row"><span>Provider</span><strong>Not connected</strong></div><div className="info-row"><span>AI execution</span><strong>Integration required</strong></div><div className="info-row"><span>Task status</span><strong>{taskForAgent?taskForAgent.status:'Idle (simulated)'}</strong></div>
            <button className="primary-btn" onClick={()=>setTab('tasks')}><ListTodo size={16}/> View demo tasks <ArrowRight size={15}/></button>
          </>:<><div className="agent-intro"><div className="intro-icon"><Users size={30}/></div><h3>Your virtual team</h3><p>Explore the campus. Click a character to view its role and demo status.</p></div><p className="input-label">TEAM ROSTER</p><div className="roster">{agents.map(a=><button key={a.id} onClick={()=>select(a.id)}><span style={{background:a.color}} className="roster-dot"/><span><strong>{a.name}</strong><small>{a.role}</small></span><ChevronRight size={14}/></button>)}</div></>}
        </>}
        </aside>
      </div>
      <footer><span><Code2 size={14}/> Phase 1 starter · 3D world + clearly labeled demo orchestration</span><span>Full specification: <a href="https://docs.google.com/document/d/1EFuYf9Dqbf26Rc4NhbWV3LcPDjQX6_Q-2IAdj961zD8/mobilebasic" target="_blank" rel="noreferrer">Master Prompt</a></span></footer>
    </main>
  </div>;
}
