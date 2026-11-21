export type Agent = { id: string; name: string; role: string; team: string; color: string; home: [number, number, number] };
export const agents: Agent[] = [
  { id:'agent-1', name:'Nova', role:'Founder Agent', team:'Strategy', color:'#edb35c', home:[-4,0,-3] },
  { id:'agent-2', name:'Atlas', role:'Project Manager', team:'Operations', color:'#81c4fa', home:[-2,0,-4] },
  { id:'agent-3', name:'Pixel', role:'UI/UX Designer', team:'Creative', color:'#e99cdd', home:[0,0,-4] },
  { id:'agent-4', name:'Byte', role:'Programmer', team:'Engineering', color:'#89e1c1', home:[2,0,-4] },
  { id:'agent-5', name:'Echo', role:'Research Agent', team:'Research', color:'#a99cf8', home:[4,0,-3] },
  { id:'agent-6', name:'Quartz', role:'QA Engineer', team:'Engineering', color:'#e8a782', home:[-5,0,2] },
  { id:'agent-7', name:'Iris', role:'Content Agent', team:'Creative', color:'#b2ca81', home:[-2,0,4] },
  { id:'agent-8', name:'Flux', role:'Data Analyst', team:'Analytics', color:'#8eb9ff', home:[1,0,4] },
  { id:'agent-9', name:'Sage', role:'Marketing Agent', team:'Growth', color:'#e59b9b', home:[4,0,4] },
  { id:'agent-10', name:'Orion', role:'Finance Agent', team:'Finance', color:'#e3c682', home:[6,0,1] }
];
