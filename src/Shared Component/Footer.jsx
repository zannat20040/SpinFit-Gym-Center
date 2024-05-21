import React from "react";
import logo from "../assets/images/spinfit-removebg-preview.png";
import axios from "axios";
import toast from "react-hot-toast";

const Footer = () => {

    const HandleNewsletter=(e)=>{
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const currentDate = new Date().toISOString().split('T')[0];

        const subscribers = {
            name : name,
            email:  email,
            subscribeDate:currentDate
        }

        axios.post('https://server-psi-tawny-84.vercel.app/subscribers', subscribers)
        .then(res=>{
            toast.success('Stay tuned for the latest news from SpinFit')
        })
        .catch(error=>{
            console.log(error);
        })
    }

  return (
    <>
      <div className="border-t-2 border-gray-500">
        <div className="container mx-auto px-4">
          <footer className="footer flex flex-wrap justify-between py-10 font-roboto text-base  text-white">
            <nav>
              <header className="footer-title">Services</header>
              <a className="link link-hover">Nutritional Services</a>
              <a className="link link-hover">Mind-Body Wellness</a>
              <a className="link link-hover">Personal Training</a>
              <a className="link link-hover">Group Fitness</a>
              <a className="link link-hover">Strength Training</a>
              <a className="link link-hover">Cardiovascular Training</a>
            </nav>
            <nav>
              <header className="footer-title">Company</header>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Become a Trainer</a>
              <a className="link link-hover">Gallery</a>
              <a className="link link-hover">Achievement</a>
              <a className="link link-hover">Success Stories</a>
            </nav>
            <nav>
              <header className="footer-title">Legal</header>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
            {/* newletter section */}
            <form onSubmit={HandleNewsletter} className="">
              <header className="footer-title">Newsletter</header>
              <p>Subscribe our Newsletter and gets out latest updates , offers, products and promotions we provide</p>
              <div className="form-control w-full ">

                    <input
                      type="text"
                      name="name"
                      placeholder="Type your name here"
                      required
                      className="input text-gray-600 input-bordered rounded-none"
                    />
                  </div>
              <fieldset className="form-control w-full">

                <div className="join">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="username@site.com"
                    className="input w-full text-gray-600 input-bordered rounded-none join-item"
                  />
                  <button  className="btn bg-[#dde244] border-none text-slate-950 btn-primary rounded-none join-item hover:bg-black hover:text-white">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
      <div className="border-t-4 border-gray-500 ">
        <div className="container mx-auto px-3">
          <footer className="footer items-center text-white font-roboto py-5 ">
            <aside className="items-center w-full flex flex-col justify-center md:flex-row md:justify-start">
              <img src={logo} alt="" className="w-[150px]" />
              <p className="text-center">Copyright © 2023 - All right reserved by SpinFit GYM center</p>
            </aside>
            <nav className="grid-flow-col gap-4md:justify-self-end w-full justify-center">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
