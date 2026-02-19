import { useState } from "react";
import { cardClasses, formButton, formInput, formLabel } from "../../styles/tailwindConstants";
import LoadingSpinner from "../../pages/loading/LoadingSpinner";

function ContactUs () {

    // Based on contact form from: https://sendlayer.com/blog/how-to-create-a-contact-form-in-react-js/#step-two
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitStatus, setSubmitStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if(isLoading){
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4">

            <div className={`${cardClasses} w-4/5 mx-auto`}>
                <h2 className="font-bold text-2xl pb-4 border-b border-gray-500">Contact Us!</h2>

                {submitStatus === 'success' && (
                    <div className="">
                        <p>Thank you! Your message has been sent successfully.</p>
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="">
                        <p>Sorry, there was an error sending your message. Please try again.</p>
                    </div>
                )}
   
                <form className="pt-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 pb-12">
                        <div>
                            <label className={`${formLabel}`}>Name</label>
                            <input type="text" minLength={2} required placeholder="e.g. John Doe" className={`${formInput}`}></input>
                        </div>

                        <div>
                            <label className={`${formLabel}`}>Email</label>
                            <input type="email" required placeholder="e.g. jdoe@doe.ie" className={`${formInput}`}></input>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <label className={`${formLabel}`}>Subject</label>
                            <input type="text" minLength={3} required placeholder="e.g. Important Subject" className={`${formInput}`}></input>
                        </div>

                        <div>
                            <label className={`${formLabel}`}>Message</label>
                            <textarea type="text" minLength={10} rows={6} required placeholder="Enter your message here..." className={`${formInput} resize-none`}></textarea>
                        </div>
                    </div>

                    <button className={`${formButton} mt-8`}>Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;