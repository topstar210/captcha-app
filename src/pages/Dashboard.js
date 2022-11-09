import { useNavigate } from "react-router-dom";

import Card from "../components/Card";

let betList = [{
    imgUrl: '/images/capcha_levels/level_1.png',
    level:'1',
    title:'Freelancer',
    content:'$.002 per capcha max 5 capcha perday',
    price:'Free'
},{
    imgUrl: '/images/capcha_levels/level_2.png',
    level:'2',
    title:'Partime Job',
    content:'$.06 per capcha max 5 cpacha per day',
    price:'20'
},{
    imgUrl: '/images/capcha_levels/level_3.png',
    level:'3',
    title:'Employee',
    content:'$.15 per capcha max 5 capcha per day',
    price:'50'
},{
    imgUrl: '/images/capcha_levels/level_4.png',
    level:'4',
    title:'Supervisor',
    content:'$.3 per capcha max 5 capcha per day',
    price:'100'
},{
    imgUrl: '/images/capcha_levels/level_5.png',
    level:'5',
    title:'Manager',
    content:'$1.5 per capcha max 5 capcha per day',
    price:'500'
},{
    imgUrl: '/images/capcha_levels/level_6.png',
    level:'6',
    title:'Director',
    content:'$3 per capcha max 5 capcha per day',
    price:'1000'
}];

const Dashboard = () => {
    const navigate = useNavigate();

    const playCaptcha = (lv) => {
        navigate(`/playcaptcha/${lv}`)
    }

    return (
        <>
            <div className="flex flex-wrap -mx-4">
                {
                    betList && 
                    betList.map((v,i) => <Card
                        key={ i }
                        imgUrl = { v.imgUrl }
                        level = { v.level }  
                        title = { v.title }  
                        content = { v.content }  
                        price = { v.price }
                        handleClickFun = { () => playCaptcha(v.level) }
                    />)
                }
            </div>
        </>
    )
}

export default Dashboard;