import { Route, Routes } from 'react-router-dom'
import Nav from "./Nav";

import Dashboard from '../pages/Dashboard';
import PlayCaptcha from '../pages/PlayCaptcha';

const DefaultLayout = () => {
    return (
        <>
            <Nav />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* <!-- Replace with your content --> */}
                    <Routes>
                        <Route path="/playcaptcha/:level" element={<PlayCaptcha />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>  
                    {/* <!-- /End replace --> */}
                </div>
            </main>
        </>
    )
}

export default DefaultLayout;