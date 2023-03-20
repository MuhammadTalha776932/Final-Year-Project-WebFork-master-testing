import React from 'react'
import "../styles/Submit.css"

const Submit = () => {
  return (
    <div class="col-md-6 offset-md-3 mt-5 container-form">
    <div class="submit-term">
        <h1>TEMPLATE SUBMISSION TERMS</h1>
        <h3>
            If you are not the original developer of a template that you wish to submit, make sure that all template credits are intact. <br/>
            The template credits are important for copyright. WebFork can not be held reponsible for templates thar are submitted by third parties who have removed or changed credit information.
        </h3>
    </div>
     <div class="form_container2">
     <form action='mailto:fasihmughal11@gmail.com' target="_blank">
       <div class="form-group">
         <label for="exampleInputName"  className=''>Full Name</label>
         <input type="text" name="fullname" class="form-control" id="exampleInputName" placeholder="Enter Your Name" required="required"/>
       </div>
       <div class="form-group">
         <label for="exampleInputEmail1" required="required">Email Address</label>
         <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email"/>
       </div>

       <div class="form-group mt-3">
         <label class="mr-2" id='form-group-id'>Upload Your Template:</label>
         <input type="file" name="file" className='form-submit'/>
       </div>

       <button type="submit" class="btn btn-primary template-button">Submit</button>
     </form>
    </div>
 </div> 
  )
}

export default Submit