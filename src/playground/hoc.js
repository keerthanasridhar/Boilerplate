
import React from 'react'
import ReactDOM from 'react-dom';




const Info = (props)=>(
<div>
    <h1> Info</h1>
    <p>The info is:{props.info}</p>
</div>
);

const withAdminWarning = (WrappedComponent)=>{
    return (props)=>(
        <div>
        {props.isAdmin &&<p> This is private info.Please dont share!</p>}
        <WrappedComponent {...props}/>
        </div>
    )
};

const  requiredAuthentiation = (WrappedComponent)=>{
    return (props)=>(
        <div>
        {props.isAuthentication ? ( 
        <WrappedComponent {...props}/> ) :
         ( <p>Please Login in to view the info</p>
      )}
        </div>
    )
}
 

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requiredAuthentiation(Info);
// ReactDOM.render(<AdminInfo isAdmin = {false} info = "This are the details"/>,document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthentication = {true} info = "This are the details"/>,document.getElementById('app'))

