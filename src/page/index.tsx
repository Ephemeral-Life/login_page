import React, { useState } from 'react';
import Header from "components/Header";
import Login_form from "components/Login_form";
import Bottom from "components/Bottom";
import Register from 'components/Register';


export default function Index() {
    const [switch_choose, setSwitch_choose] = useState(0);
    function switch_login_reg(data: number) {
        setSwitch_choose(data)
    }
    return (
        <div className="index">
            <Header/>
            <MiddleDiv switch_choose={switch_choose} switch_login_reg={switch_login_reg}/>
            <Bottom/>
        </div>
    );
} 

interface MiddleDivProps {
    switch_choose: number;
    switch_login_reg: (data: number) => void;
}

function MiddleDiv(props: MiddleDivProps) 
{
    const { switch_choose, switch_login_reg } = props;
    if(switch_choose === 0 || switch_choose === 3)
        return(<Login_form passData={switch_login_reg} initFlag={switch_choose}/>)
    else
        return(<Register passData={switch_login_reg}/>)
}
