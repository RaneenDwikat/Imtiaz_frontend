import Sidebar from "../component/sidebar";
import { useState } from "react";
import AddOutcomes from "./outcomes/addOutcome";
import OutcomeTable from "./outcomes/outcome";

export default function Outcomes(){
const [state,setState]=useState(0)
return(<div>
    <Sidebar />
    <AddOutcomes state={state} setState={setState} />
    <OutcomeTable state={state} setState={setState}/>
</div>);
}