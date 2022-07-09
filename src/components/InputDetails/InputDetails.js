import React, { useState } from 'react';
import {Container,Form,Button,Row,Col,Table} from 'react-bootstrap';
import { useNavigate } from 'react-router';


const Form1Data=[
    {label:'email',name:"email"},
    {label:'Res status of seller',label1:"Res",label2:"Non Res",value1:"A1",value2:"A2",name:"status"},
    {label:'Res status of seller',label1:"Res",label2:"Non Res",value1:"A1",value2:"A2",name:"status"},
    {label:'Period of holding',label1:"Up to 24 mths",label2:">24 mths",value1:"B1",value2:"B2",name:"period"},
    {label:'Shares acquired by Jan 31, 2018',label1:"Yes",label2:"No",value1:"C1",value2:"C2",name:"share"},
    {label:'Type of seller',label1:"Individual",label2:"Co",value1:"D1",value2:"D2",name:"seller"},
    {label:'Mode of acqn by seller',label1:"Purchase",label2:"Gift",value1:"E1",value2:"E2",name:"mod_acqn"},
    {label:'STT paid on sale',label1:"Paid",label2:"Not paid",value1:"F1",value2:"F2",name:"sale"},
    {label:'STT paid on purchase',label1:"Paid",label2:"Not paid",value1:"G1",value2:"G2",name:"purchase"},
]


const InputDetails = () => {
    const navigate=useNavigate();
        const [form1Data, setform1Data] = useState({
          email:"",
          status:"",
          period:'',
          share:'',
          seller:'',
          mod_acqn:'',
          sale:'',
          purchase:''
        })
    
        const { status,period,share,seller,mod_acqn,sale,purchase,email} =form1Data;
        // console.log(status,period,share,seller,mod_acqn,sale,purchase);
    
        const onChange=(e)=>{
            setform1Data({...form1Data,[e.target.name]:e.target.value});
            // console.log(e.target.value); 
        }
    
    
        const handleSubmit=()=>{          
            fetch('http://localhost:5000/form-details',{
                method:'POST',
                headers:{
                  'content-type':'application/json'
                },
                body: JSON.stringify(form1Data)
            })
            .then(res=>res.json())
            .then(data=>console.log(data))

            navigate('/')
        }
    

    
    return (
        <div>
                  <Container className='my-4' fluid>
            <Row>
                <Col lg={4}>
                    <Form className='shadow border p-4'>
                    {/* {label:'Res status of seller',label1:"Res",label2:"Non Res",value1:"A1",value2:"A2",name:"status"}, */}
                    <div>
                            <Form.Label>Email:</Form.Label>
                            <div className='d-flex  mb-2'>
                                <input type="text"  
                                   onChange={(e)=>onChange(e)}   name={"email"} />
                            </div>
                            </div>
                        
                        <div>
                            <Form.Label>A: Res status of seller</Form.Label>
                            <div className='d-flex justify-content-between mb-2'>
                                <Form.Check   type="radio"  value={"A1"} label={'Res'} 
                                   onChange={(e)=>onChange(e)}   name={"status"} />
                                <Form.Check   type="radio"  value={"A2"} label={'Non Res'} 
                                   onChange={(e)=>onChange(e)}   name={"status"} />
                            </div>
                        </div>
                    {/* {label:'Period of holding',label1:"Up to 24 mths",label2:">24 mths",value1:"B1",value2:"B2",name:"period"}, */}
                        {
                            status!=='A2' && 
                        <div>
                            <Form.Label>B: Period of holding</Form.Label>
                            <div className='d-flex justify-content-between mb-2'>
                                <Form.Check   type="radio"  value={"B1"} label="Up to 24 mths"
                                   onChange={(e)=>onChange(e)}   name="period" />
                                <Form.Check   type="radio"  value={"B2"} label=">24 mths" 
                                   onChange={(e)=>onChange(e)}   name="period" />
                            </div>
                        </div>
                        }

                        {/* {label:'Shares acquired by Jan 31, 2018',label1:"Yes",label2:"No",value1:"C1",value2:"C2",name:"share"}, */}
                        {
                            period!=='B1' && 
                            <div>
                                <Form.Label>C: Shares acquired by Jan 31, 2018</Form.Label>
                                <div className='d-flex justify-content-between mb-2'>
                                    <Form.Check   type="radio"  value="C1" label="Yes" 
                                       onChange={(e)=>onChange(e)}   name="share" />
                                        {
                                        period!=='B2' && 
                                        <Form.Check   type="radio"  value="C2" label="No" 
                                            onChange={(e)=>onChange(e)}   name="share" />
                                        }
                                </div>
                            </div>
                         }
                        {/* {label:'Type of seller',label1:"Individual",label2:"Co",value1:"D1",value2:"D2",name:"seller"}, */}
                        <div>
                            <Form.Label>D: Type of seller</Form.Label>
                            <div className='d-flex justify-content-between mb-2'>
                                <Form.Check   type="radio"  value="D1" label="Individual" 
                                   onChange={(e)=>onChange(e)}   name="seller" />
                                <Form.Check   type="radio"  value="D2" label="Co" 
                                   onChange={(e)=>onChange(e)}   name="seller" />
                            </div>
                        </div>
                        {/* {label:'Mode of acqn by seller',label1:"Purchase",label2:"Gift",value1:"E1",value2:"E2",name:"mod_acqn"}, */}
                        <div>
                            <Form.Label>E: Mode of acqn by seller</Form.Label>
                            <div className='d-flex justify-content-between mb-2'>
                                <Form.Check   type="radio"  value="E1" label="Purchase" 
                                   onChange={(e)=>onChange(e)}   name="mod_acqn" />
                                <Form.Check   type="radio"  value="E2" label="Gift" 
                                   onChange={(e)=>onChange(e)}   name="mod_acqn" />
                                   {
                                    seller==="D2"?null:
                                        <Form.Check   type="radio"  value="E3" label="Will" 
                                        onChange={(e)=>onChange(e)}   name="mod_acqn" />
                                    }
                                   {
                                    seller==="D1"?null:
                                    <Form.Check   type="radio"  value="E4" label="Merger" 
                                    onChange={(e)=>onChange(e)}   name="mod_acqn" />
                                    }
                            </div>
                        </div>
                        {/* {label:'STT paid on sale',label1:"Paid",label2:"Not paid",value1:"F1",value2:"F2",name:"sale"}, */}
                        <div>
                            <Form.Label>F: STT paid on sale</Form.Label>
                            <div className='d-flex justify-content-between mb-2'>
                                <Form.Check   type="radio"  value="F1" label="Paid" 
                                   onChange={(e)=>onChange(e)}   name="sale" />
                                <Form.Check   type="radio"  value="F2" label="Not Paid" 
                                   onChange={(e)=>onChange(e)}   name="sale" />
                            </div>
                        </div>
                        {/* {label:'STT paid on purchase',label1:"Paid",label2:"Not paid",value1:"G1",value2:"G2",name:"purchase"}, */}
                        <div>
                            <Form.Label>G: STT paid on purchase</Form.Label>
                            <div className='d-flex justify-content-between mb-2'>
                                <Form.Check   type="radio"  value="G1" label="Paid" 
                                   onChange={(e)=>onChange(e)}   name="purchase" />
                                <Form.Check   type="radio"  value="G2" label="Not Paid" 
                                   onChange={(e)=>onChange(e)}   name="purchase" />
                            </div>
                        </div>
                        <hr/>
                        <Button  onClick={()=>handleSubmit()}>Submit</Button>
                    </Form>         
                </Col>
            </Row>
        </Container>

        </div>
    );
};

export default InputDetails