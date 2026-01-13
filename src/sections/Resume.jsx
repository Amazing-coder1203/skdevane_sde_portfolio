import { useState, useRef } from "react";
import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import clsx from "clsx";
import { PDFViewer } from '@embedpdf/react-pdf-viewer';

const Resume = () => {
    const [isLoading, setIsLoading] = useState(true);
    const viewerRef = useRef(null);
    const basePath = "/SKDevane_Data_Portfolio/";
    const resumeUrl = `${basePath}resume/SK_Devane_CV_v2.pdf`;

    return (
        <section className="relative z-2 py-24 md:py-28 lg:py-40">
            <Element name="Resume">
                <div className="container">
                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 border-2 border-s3 rounded-7xl p-8 md:p-16 lg:p-20 g7">

                        {/* Left Side: Content */}
                        <div className="flex-1 flex flex-col items-start text-left max-lg:items-center max-lg:text-center">
                            <p className="caption mb-4 uppercase text-p3">Professional Credentials</p>
                            <h2 className="h2 mb-6 text-p4 uppercase max-md:h4">
                                My Resume
                            </h2>
                            <p className="body-1 mb-8 max-w-md max-lg:mx-auto">
                                Technical expertise in Data Analysis, Python, and SQL. Download my full CV for detailed project experience and academic background.
                            </p>
                            <a href={resumeUrl} download="SK_Devane_Resume.pdf">
                                <Button icon="images/zap.svg">Download PDF</Button>
                            </a>
                        </div>

                        {/* Right Side: PDF Viewer */}
                        <div className="flex-1 w-full max-w-[500px] flex justify-center items-center relative">
                            <div className="rounded-30 md:rounded-40 relative border-2 border-s5 overflow-hidden bg-s1 w-full aspect-[1/1.414] shadow-3xl">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-s2 z-10">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-p1"></div>
                                    </div>
                                )}

                                <div className={clsx(
                                    "w-full h-full transition-opacity duration-500",
                                    isLoading ? "opacity-0" : "opacity-100"
                                )}>
                                    <PDFViewer
                                        ref={viewerRef}
                                        key={resumeUrl}
                                        config={{
                                            src: resumeUrl,
                                            theme: { preference: 'dark' },
                                            disabledCategories: ['sidebar'],
                                            pdfium: {
                                                wasmUrl: `${basePath}pdfium.wasm`
                                            }
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                        onReady={() => setIsLoading(false)}
                                    />
                                </div>
                                <div className="absolute inset-0 pointer-events-none border-4 border-s2/20 rounded-30 md:rounded-40" />
                            </div>
                        </div>

                    </div>
                </div>
            </Element>
        </section>
    );
};

export default Resume;
