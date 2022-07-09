import React from 'react';
import { useState } from 'react';
import './OutCome.css'
import {Container,Form,Button,Row,Col,Table} from 'react-bootstrap';
import TaxRow from '../../TaxRow/TaxRow'

const OutCome = () => {
    const [tr,setTable]=useState({});
    const [table4Data, setTable4Data] = useState({text1:'',text2:'',data:null});
    const [table1Data, setTable1Data] = useState({text1:'',text2:'',data:null});
    const [table2Data, setTable2Data] = useState({text1:'',text2:'',data:null});
    const [table3Data, setTable3Data] = useState({text1:'',text2:'',data:null});

    const {mod_acqn,period,purchase,sale,seller,share,status}=tr;
    
    const saleProcee=300;
    const COA=100;
    const Purchase_FY=1.1; 
    const Sale_FY=1.2; 
    const Jan_18_FMV=150; 
    const Indexed_gain=136.3636364;
    const Un_indexed_gain=150;
    const per_ind_gain=27.27272727;
    const per_unind_gain=15;
    
    const handleSearch=(e)=>{
        e.preventDefault()
        const email = e.target.email.value
        // console.log(email)
        
        fetch(`http://localhost:5000/outcomeDetails/${email}`,{
            method:'GET',
        })
        .then(res=>res.json())
        .then(data=>{setTable(data[0])})

       myFunction();
       myFunction();
        
        
    }
    function myFunction() {
           // The function returns the product of p1 and p2
           if(status==="A2"){
            setTable1Data({text1:'First proviso value',text2:'Sale proceeds, date of sale	'});
          }else{
            setTable1Data({text1:'Sale proceeds',text2:'Sale proceeds',data:saleProcee});
          }
        if((status==="A1" && period==='B2' && sale==='F2') || (status==="A1" && period==='B2' && sale==='G2')){
            setTable2Data({text1:'Indexed cost of acquisition (ICOA)',text2:'COA, Purchase FY, Sale FY',data:COA});
          }else if(status==="A2"){
            setTable2Data({text1:'First proviso value',text2:'COA, date of purchase',data:COA});
          }else if(period=='B2' && share=="C1"){
            setTable2Data({text1:'31 Jan 2018 COA',text2:'31-Jan-18 FMV',data:Jan_18_FMV});
          }else{
            setTable2Data({text1:'Cost of acquisition (COA)',text2:'COA',data:COA});
          }
    
          if(( status==="A1"  && period==="B2"  && sale==="F1" && purchase==="G1") ||  ( status==="A2"  && period==="B2"  && sale==="F1" && purchase==="G1")){
            console.log('table3');

            //  ( ==="A1"  && ==="B2"  && ==="F1" &&G1) or  ( ==="A2"  && ==="B2"  && ==="F1" &&G1)
            setTable3Data({
                text1:'Un-indexed gain and non-forex-fluctuated gain',
                text2:'Sale proceeds (-) Higher of "COA" or "31 Jan 2018 FMV"',
                data:saleProcee-COA
              });
          }else if( (status ==="A1"  && period==="B2" && sale==="F2") ||  (status ==="A1"  && period==="B2" && purchase==="G2")){
            console.log('table3');

            //  ( ==="A1"  && ==="B2" && F2) or  ( ==="A1"  && ==="B2" &&G2)
            setTable3Data({
                text1:'Indexed gain and un-indexed gain',
                text2:'[Sale proceeds (-) (Higher of "COA" or "31 Jan 2018 FMV")*Sale FY/Purchase FY] and [Sale proceeds (-) Higher of "COA" or "31 Jan 2018 FMV"]',
                data:saleProcee-(COA)*Sale_FY/Purchase_FY
          });
          }else if(( status==="A2"  && period==="B2" && sale==="F2") ||  (status ==="A2"  && period==="B2" && purchase=== "G2")){
            console.log('table3');

            //  ( ==="A2"  && ==="B2" &&F2) or  ( ==="A2"  && ==="B2" &&G2)
            setTable3Data({
                text1:'First proviso based gain',
                text2:'[(Sale proceeds/75) (-) ((Higher of "COA" and "31 Jan 2018 FMV")/50)]*75',
                data:((saleProcee-Jan_18_FMV)/50)*75
            });
          }else if(( period==="B1"  && sale==="F1" && purchase==="G1") ||  (period ==="B1" && purchase==="G2")){
            console.log('table3');

            //  ( ==="B1"  && ==="F1" &&G1) or  ( ==="B1" &&G2)
            setTable3Data({text1:'ST gain',
            text2:'Sale proceeds (-) Higher of "COA" or "31 Jan 2018 FMV"',
            data:saleProcee-Jan_18_FMV});
          }
    
          if((status ==="A1"  && period==="B2"  && sale==="F1" && purchase==="G1") ||  (status ==="A2"  && period==="B2"  && sale==="F1" && purchase==="G1")){
            console.log('table4');
            //  ( ==="A1"  && ==="B2"  && ==="F1" &&G1) or  ( ==="A2"  && ==="B2"  && ==="F1" &&G1)
            setTable4Data({text1:'10% LT on un-indexed and non-forex-fluctuated gain',
            text2:'(Un-indexed gain and non-forex-fluctuated gain) * 10%',data:Un_indexed_gain*0.1});
          }else if((status ==="A2"  && period==="B2" && sale==="F2") ||  ( status==="A2"  && period==="B2" && purchase==="G2")){
            console.log('table4');

            //  ( ==="A2"  && ==="B2" &&F2) or  ( ==="A2"  && ==="B2" &&G2)
            setTable4Data({text1:'10% LT on First proviso based gain (but un-indexed)',
            text2:'First proviso based gain * 10%',
            data:per_unind_gain
          });
          }else if((status ==="A1"  && period==="B2" && sale==="F2") ||  (status ==="A1"  && period==="B2" && purchase==="G2")){
            console.log('table4');

            //  ( ==="A1"  && ==="B2" &&F2) or  ( ==="A1"  && ==="B2" &&G2)
            setTable4Data({
                text1:'Lower of 20% LT on indexed gain & 10% LT on un-indexed gain',
                text2:'Lower of Indexed gain * 20% and Un-indexed gain *10%',
                data:per_unind_gain
              });
          }else if(( period==="B1"  && sale==="F1" && purchase==="G1") ||  ( period==="B1" && purchase==="G2")){
            console.log('table4');
            //  ( ==="B1"  && ==="F1" &&G1) or  ( ==="B1" &&G2)
            setTable4Data({text1:'15% ST',text2:'(Un-indexed gain and non-forex-fluctuated gain) * 15%',data:Un_indexed_gain*0.15});
          }
      }
    

    return (
       <>

       
    <div className='d-flex justify-content-center align-items-center mt-4'>
    <form onSubmit={handleSearch}>
    <input type="email" name="email"  id="" placeholder='Enter Email' required />
    <input type="submit" value="search" />
    </form>
</div>
<div>
        <Container className='my-4' fluid>
            <Row>
                <Col lg={0}>  
                </Col>
                <Col lg={12} >
                     <Row>
                         <Col lg={6}>
                            <table className='my-4 shadow'>   
                                <tr  style={{border:'1px solid black'}}>  
                                    <td>  
                                        <table>  
                                            <tr className='m-0' style={{background:'lightgreen',borderBottom:'1px solid black'}}>  
                                                <td className='p-2 text-center' >Sale consideration</td>  
                                            </tr>  
                                            <tr className='m-0' style={{background:'lightblue'}}>  
                                                <td className='p-2 text-center' >Outcome</td>
                                            </tr>  
                                        </table>  
                                    </td> 
                                    <td className='px-2 text-center' style={{background:'lightblue',border:'1px solid black'}}>Input needed</td>  
                                </tr>  
                                <tr className='border'>  
                                    <td className='p-2'>{table1Data.text1}</td>  
                                    <td className='p-2 border'>
                                        <p>{table1Data.text2}</p>
                                        <p>{table1Data.data}</p>
                                    </td>  
                                </tr>  
                            </table> 
                         </Col>
                         <Col lg={6}>
                            <table className='my-4 shadow'>   
                                <tr  style={{border:'1px solid black'}}>  
                                    <td>  
                                        <table>  
                                            <tr className='m-0' style={{background:'lightgreen',borderBottom:'1px solid black'}}>  
                                                <td className='p-2 text-center' >Purchase price/ Cost</td>  
                                            </tr>  
                                            <tr className='m-0' style={{background:'lightblue'}}>  
                                                <td className='p-2 text-center' >Outcome</td>
                                            </tr>  
                                        </table>  
                                    </td> 
                                    <td className='px-2 text-center' style={{background:'lightblue',border:'1px solid black'}}>Input needed</td>  
                                </tr>  
                                <tr className='border'>  
                                    <td className='p-2'>{table2Data.text1}</td>  
                                    <td className='p-2 border'>
                                        <p>{table2Data.text2}</p>
                                        <p>{table4Data.data}</p>
                                    </td>  
                                </tr>  
                            </table>
                         </Col>
                         <Col lg={6}>

                            <table className='my-4 shadow'>   
                                <tr  style={{border:'1px solid black'}}>  
                                    <td>  
                                        <table>  
                                            <tr className='m-0' style={{background:'lightgreen',borderBottom:'1px solid black'}}>  
                                                <td className='p-2 text-center' >Capital gain</td>  
                                            </tr>  
                                            <tr className='m-0' style={{background:'lightblue'}}>  
                                                <td className='p-2 text-center' >Outcome</td>
                                            </tr>  
                                        </table>  
                                    </td> 
                                    <td className='px-2 text-center' style={{background:'lightblue',border:'1px solid black'}}>Back end to compute and show these values</td>  
                                </tr>  
                                <tr className='border'>  
                                    <td className='p-2'>{table3Data.text1}</td>  
                                    <td className='p-2 border'>
                                        <p>{table3Data.text2}</p>
                                        <p>{table3Data.data}</p>
                                    </td>  
                                </tr>  
                            </table>
                         </Col>
                         <Col lg={6}>
                            <table className='my-4 shadow'>   
                                <tr  style={{border:'1px solid black'}}>  
                                    <td>  
                                        <table>  
                                            <tr className='m-0' style={{background:'lightgreen',borderBottom:'1px solid black'}}>  
                                                <td className='p-2 text-center' >Tax</td>  
                                            </tr>  
                                            <tr className='m-0' style={{background:'lightblue'}}>  
                                                <td className='p-2 text-center' >Outcome</td>
                                            </tr>  
                                        </table>  
                                    </td> 
                                    <td className='px-2 text-center' style={{background:'lightblue',border:'1px solid black'}}>Back end to compute and show these values</td>  
                                </tr>  
                                <tr className='border'>  
                                    <td className='p-2'>{table4Data.text1}</td>  
                                    <td className='p-2 border'>
                                        <p>{table4Data.text2}</p>
                                        <p>{table4Data.data}</p>
                                    </td>  
                                </tr>  
                            </table>
                         </Col>
                     </Row>
                </Col>
            </Row>
        </Container>
    </div>
       </>
    );
};

export default OutCome;