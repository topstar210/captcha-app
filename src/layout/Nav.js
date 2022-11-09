import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

import myaxios from "../provider/API";
import Storage from "../utils/Storage";

import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from "../store/actions/app.actions";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = async () => {
    await myaxios.auth.logout();
    localStorage.removeItem("c_token");
    navigate('/login');
  }


  const sapp = useSelector(state => state.sapp);
  console.log(sapp)
  if(!Storage.get('c_token')){
    console.log('logout')
    setTimeout(()=>{navigate('/login');},10)
  }

  useEffect(()=>{
    if(Storage.get('c_token') && Storage.get('c_token') != 'undefined'){
        myaxios.auth.checkToken("Bearer "+Storage.get('c_token')).then((res)=>{
          dispatch(setUserInfo(res.data));
        })
    }
  },[]);

  return (
    <>
      <nav className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/dashboard">
                  <img
                    className="h-12 w-12"
                    src="/images/logo.svg"
                    alt="Workflow"
                  />
                  </Link>
                </div>
                <div className="ml-3 text-xl text-white">Captcha</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* <Link
                  href="#"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link> */}

                <Link
                  onClick={ () => handleLogout() }
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log out
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-fuchsia-300 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-fuchsia-400 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(divRef) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={divRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {/* <Link
                  href="#"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link> */}

                <Link
                  onClick={ () => handleLogout() }
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log out
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
    </>
  );
}

export default Nav;
