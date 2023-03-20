import React from 'react'
import "../styles/Whatsapp.css"

const Whatsapp = () => {
  return (
    <div>
               {/* WhatsApp icon */}
      <a
        href="https://wa.me/+923174426674"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
       <i class='bx bxl-whatsapp whatsapp-second'></i>
        {/* <i class="fa fa-whatsapp" aria-hidden="true"></i> */}
        {/* <i class="fa-brands fa-whatsapp"></i> */}

      </a>
    </div>
  )
}

export default Whatsapp