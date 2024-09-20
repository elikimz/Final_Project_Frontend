//import React from 'react';

function Footer() {
    return (
        <footer className="w-full py-4 bg-white text-black">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-6 mb-2">
                    <a href="#" className="text-gray-500 hover:text-black">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.22 8.1 7.45 8.84v-6.28H5.88V12h3.57V9.61c0-3.53 2.1-5.48 5.32-5.48 1.54 0 3.09.28 3.09.28v3.41h-1.74c-1.71 0-2.24 1.06-2.24 2.15V12h3.81l-.61 3.56h-3.2v8.6C18.78 20.1 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                            />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-black">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19.615 3.184c-3.604-.246-11.626-.244-15.231 0-3.54.241-4.363 2.304-4.384 8.816.021 6.459.818 8.549 4.384 8.816 3.604.246 11.626.244 15.231 0 3.54-.241 4.363-2.304 4.384-8.816-.021-6.459-.818-8.549-4.384-8.816zm-11.615 12.816v-8l8 4-8 4z"
                            />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-black">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                            />
                        </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-black">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19.615 3.184c-3.604-.246-11.626-.244-15.231 0-3.54.241-4.363 2.304-4.384 8.816.021 6.459.818 8.549 4.384 8.816 3.604.246 11.626.244 15.231 0 3.54-.241 4.363-2.304 4.384-8.816-.021-6.459-.818-8.549-4.384-8.816zm-11.615 12.816v-8l8 4-8 4z"
                            />
                        </svg>
                    </a>
                </div>
                <div className="mb-2">
                    <p>Follow us on social media</p>
                </div>
                <div className="mb-2">
                    <p>Contact us: <a href="mailto:info@kimscarhire.com" className="underline">info@kimscarhire.com</a> | +254791337188</p>
                </div>
                <div className="mb-2">
                    <p>&copy; {new Date().getFullYear()} Kim's Car Hire. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
