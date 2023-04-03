import Sidebar from "../component/sidebar";
import { useState } from "react";
import AddIncomes from "./incomes/addIncomes";
import IncomeTable from "./incomes/incomes";

export default function Incomes(){
const [state,setState]=useState(0)
return(<div>
    <Sidebar />
    <AddIncomes state={state} setState={setState} />
    <IncomeTable state={state} setState={setState}/>
</div>);
}