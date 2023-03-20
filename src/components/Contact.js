import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <>
      <section class="container mt-5 pt-5" id={"ContactUs"}>
        {/* Contact heading */}
        <div class="row">
          {/* Grid column */}
          <div class="col-sm-12 mb-4 col-md-5">
            {/* Form with header */}
            <div class="card border-primary rounded-0">
              <div class="card-header p-0">
                <div class="bg-primary text-white text-center py-2">
                  <h3>
                    <i class="fa fa-envelope"></i> Contact With Us:
                  </h3>
                  <p class="m-0">
                    Feel free to get in touch with us. We are always open.
                  </p>
                </div>
              </div>
              <div class="card-body p-3">
                <div class="container-form-group">
                  <label> Your name </label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your name"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div class="container-form-group">
                  <label>Your email</label>
                  <div class="input-group mb-2 mb-sm-0">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div class="container-form-group">
                  <label>Subject</label>
                  <div class="input-group mb-2 mb-sm-0">
                    <input
                      type="text"
                      name="data[subject]"
                      class="form-control"
                      id="inlineFormInputGroupUsername"
                      placeholder="Subject"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div class="container-form-group">
                  <label>Message</label>
                  <div class="input-group mb-2 mb-sm-0">
                    <input
                      type="text"
                      class="form-control"
                      name="mesg"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div class="text-center">
                  <input
                    type="submit"
                    name="submit"
                    value="submit"
                    class="contact-btn btn-primary btn-block rounded-0 py-2 mt-3"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Grid column */}

          {/* Grid column */}
          <div class="col-sm-12 col-md-7">
            {/* Google map */}
            <div class="mb-4" id="contact-iframe">
              <iframe
                title="contact-frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.2070057205547!2d74.30140211502571!3d31.573370781351972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ca4502a7b33%3A0x22514efee6d62865!2sGovt.%20Islamia%20College%20Civil%20Lines!5e0!3m2!1sen!2s!4v1661602143286!5m2!1sen!2s"
                width="600"
                height="460"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            {/* Buttons */}
            <div class="row text-center">
              <div class="col-md-4">
                <a class="bg-primary px-3 py-2 rounded text-white mb-2 d-inline-block">
                  <i class="fa fa-map-marker"></i>
                </a>
                <p>Govt. Islamia College</p>
              </div>
              <div class="col-md-4">
                <a class="bg-primary px-3 py-2 rounded text-white mb-2 d-inline-block">
                  <i class="fa fa-phone"></i>
                </a>
                <p>+92 3174426674</p>
              </div>
              <div class="col-md-4">
                <a class="bg-primary px-3 py-2 rounded text-white mb-2 d-inline-block">
                  <i class="fa fa-envelope"></i>
                </a>
                <p> fasihmughal11@gmail.com</p>
              </div>
            </div>
          </div>
          {/* <Grid column */}
        </div>
      </section>
    </>
  );
};

export default Contact;
