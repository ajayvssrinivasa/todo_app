
import React,{useState,useRef} from 'react'
import './Application.css'
import ls from 'localstorage-slim'
const re = /^[0-5\b]+$/;
export default function Home1() {
    let init = {
        ProductTitle:'',
        Description:'',
        errors:{
            ProductTitle:'',
            Description:'',
        }

    };
    const [todo,setTodo]=useState([])
    const [state,setState]=useState(init);
   
    let ProductTitle=useRef(null);
    
    const handler=(event)=>{
        const {name,value}=event.target;
        let errors=state.errors;
        switch(name){
            case 'ProductTitle':
                errors.ProductTitle= value.length<4?'title is not valid':'';
                break;
            case 'Description':
                errors.Description= re.test(value)?'':'Enter 1 to 5';
                break;
            default:
                break;   
        }
        setState({...state, errors:errors,[name]:value})
    }
    const postLogin=(event)=>{
        event.preventDefault();
         
        let formData={title:state.ProductTitle,Description:state.Description,isCompleted:false}
        let arr = ls.get('todo',{decrypt:true});
        if(arr===null){
            arr = [];
        }
            arr.push(formData);
            setTodo([...todo, formData])
        //localStorage.setItem('todo', JSON.stringify(arr));  
         ls.set('todo',arr,{encrypt:true});
        
    }
    const com=(id)=>{
        let arr = ls.get('todo',{decrypt:true});
        let mapped = arr.map(task => {
            return task.title === id ? { ...task, isCompleted: true} : { ...task};
          });
          ls.set('todo',mapped,{encrypt:true});
          setTodo(mapped);
    }
   
     
    const handleRemoveItem = (id) => {
        let arr =ls.get('todo',{decrypt:true});
         let temp = arr.filter(to => to.title !== id);
         ls.set('todo',temp,{encrypt:true});
        setTodo(temp);
         
       };
       
    return (
        <div className="container" style={{backgroundColor:"coral",marginTop:100}}>
            <h2>Todo List</h2>
            <form onSubmit={postLogin.bind()}>
                <div className="row">
                <div className="form-group col-lg-6">
                    <label>Add Task</label>
                    <input type="text" className="form-control" name="ProductTitle" onChange={handler} ref={ProductTitle} required/>
                    {state.errors.ProductTitle.length>0 && 
            <span style={{color:'red'}}>{state.errors.ProductTitle}</span>}
                </div>
                <div className="form-group col-md-4">
                    
                <label>Priority</label><br/>
                <select className="form-select" name="Description" onChange={handler} style={{width:100,height:40}} required>
                <option  value="Select option"></option>
                    <option  value="Lowest">1</option>
                    <option value="Low">2</option>
                    <option value="Averge">3</option>
                     <option value="High">4</option>
                     <option value="Highest">5</option>
                </select>
                
                </div>
                </div>
                <input type="submit" value="Add" className="btn btn-success"/>
            </form>
            <table className="table table-striped">
                
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th> 
                            <th>ACTION</th>
                        </tr>
                </thead>
                <tbody>
                    {todo.map(to=>
                        <tr key={to.title}>
                            <td  className={to.isCompleted?"strick":""}>{to.title}</td>
                            <td>{to.Description}</td>
                            <td className="col-md-4"><button type="submit"  className="btn btn-info mr-2" onClick={()=>com(to.title)}><i className="fa fa-check"></i></button>
                                 <button type="submit" className="btn btn-danger " onClick={()=>handleRemoveItem(to.title)}><i className="fas fa-trash"></i></button></td>
                            </tr>
                    )}
                   
                </tbody>
            </table>
        </div>
    )
}