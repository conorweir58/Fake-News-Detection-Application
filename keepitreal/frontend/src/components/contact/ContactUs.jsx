import { useState } from "react";
import { cardClasses, formButton, formInput, formLabel } from "../../styles/tailwindConstants";
import LoadingSpinner from "../../pages/loading/LoadingSpinner";
import Cookies from 'js-cookie'


function ContactUs () {

    // Based on contact form from: https://sendlayer.com/blog/how-to-create-a-contact-form-in-react-js/#step-two
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitStatus, setSubmitStatus] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SubmitData = async (e) => {
        e.preventDefault();

        setError(null);
        setIsLoading(true);
       
        try{
            const csrftoken = Cookies.get('csrftoken')

            const response = await fetch("http://127.0.0.1:8000/api/submit_contact_form/", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok){
                setError(data?.message || `API Error sending contact form: ${response.status}`);
                setSubmitStatus("error");
                return;
            }
            setSubmitStatus("success");
        } catch (error){
            setError(`Failed to submit contact form: ${error.message}`);
            setSubmitStatus("error");
        } finally {
            setIsLoading(false);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        }
    };

    if(isLoading){
        return <LoadingSpinner message="Sending..." />;
    }

    return (
        <div className="p-4">

            <div className={`${cardClasses} w-4/5 mx-auto`}>
                <h2 className="font-bold text-2xl pb-4 border-b border-gray-500">Contact Us!</h2>
   
                <form onSubmit={SubmitData} className="pt-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 pb-12">
                        <div>
                            <label className={`${formLabel}`}>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} minLength={2} required placeholder="e.g. John Doe" className={`${formInput}`}></input>
                        </div>

                        <div>
                            <label className={`${formLabel}`}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. jdoe@doe.ie" className={`${formInput}`}></input>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <label className={`${formLabel}`}>Subject</label>
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} minLength={3} required placeholder="e.g. Important Subject" className={`${formInput}`}></input>
                        </div>

                        <div>
                            <label className={`${formLabel}`}>Message</label>
                            <textarea type="text" name="message" value={formData.message} onChange={handleChange} minLength={10} rows={6} required placeholder="Enter your message here..." className={`${formInput} resize-none`}></textarea>
                        </div>
                    </div>

                    <button type="submit" className={`${formButton} mt-8`}>Send Message</button>
                </form>

                {submitStatus === 'success' && (
                    <div className="text-green-500">
                        <p>Thank you! Your message has been sent successfully.</p>
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="text-red-500">
                        <p>{error}</p>
                        <p>Sorry, there was an error sending your message. Please try again.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactUs;