import React from "react";
import { Outlet} from "react-router-dom";

const RootLayout = () =>{
    return(
        <main>           
            <div>
                {/* header */}
                <Outlet/>
            </div>
            {/* footer */}

           


        </main>
    );
};

export default RootLayout