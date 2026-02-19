
import { cardClasses} from "../../styles/tailwindConstants";

function ContactUs () {

    // Based on contact form from: https://sendlayer.com/blog/how-to-create-a-contact-form-in-react-js/#step-two
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");



    return (
        <div>

        </div>
    );
};