import Bias from '../../assets/Bias.png';
import Contact_us from '../../assets/Contact_us.png';
import Extracted_text from '../../assets/Extracted_text.png';
import Gpt from '../../assets/Gpt.png';
import File_submission from '../../assets/File_submission.png';
import URL_submission from '../../assets/URL_submission.png';
import Text_submission from '../../assets/Text_submission.png';
import Login from '../../assets/Login.png';
import Model_selection from '../../assets/Model_selection.png';
import Real_or_fake from '../../assets/Real_or_fake.png';
import Register from '../../assets/Register.png';
import Sentiment from '../../assets/Sentiment.png';
import Trustworthiness from '../../assets/Trustworthiness.png';
import { cardClasses } from '../../styles/tailwindConstants';


function Help(){

    return(
        <div className='bg-neutral-100 dark:bg-slate-800 border border-default dark:border-slate-600 rounded-base shadow-md p-4 sm:p-6 mb-4 text-left'>
        <h1>User Manual</h1>
        <div>
            <h2 id="table-of-contents"><strong>Table of Contents</strong></h2>
                <h3 id="1-introduction"><strong>1. Introduction</strong></h3>
                    <p>1.1 <a href="#1-1-what-is-keepitreal">What is KeepItREAL</a></p>
                    <p>1.2 <a href="#1-2-our-goal">Our Goal</a></p>
                    <p>1.3 <a href="#1-3-what-to-expect-from-the-manual">What to Expect</a></p>
                <h3 id="2-system-requirements"><strong>2. System Requirements</strong></h3>
                    <p>2.1 <a href="#2-1-web-browsers">Web Browsers</a></p>
                    <p>2.2 <a href="#2-2-device-requirements">Device Requirements</a></p>
                    <p>2.3 <a href="#2-3-internet-connection">Internet Connection</a></p>
                    <p>2.4 <a href="#2-4-supported-file-types">Supported File Types</a></p>
                    <p>2.5 <a href="#2-5-user-account">User Account</a></p>
                <h3 id="3-getting-started"><strong>3. Getting Started</strong></h3>
                    <p>3.1 <a href="#3-1-accessing-the-platform">Accessing the Platform</a></p>
                    <p>3.2 <a href="#3-2-creating-an-account-optional">Creating an Account</a></p>
                    <p>3.3 <a href="#3-3-understanding-the-interface">Understanding the Interface</a></p>
                    <p>3.4 <a href="#3-4-selecting-models">Selecting models</a></p>
                    <p>3.5 <a href="#3-5-running-your-first-analysis">Running your first Analysis</a></p>
                    <p>3.6 <a href="#3-6-viewing-understanding-your-results">Viewing/understanding your results</a></p>
                <h3 id="4-submitting-for-analysis"><strong>4. Submitting for Analysis</strong></h3>
                    <p>4.1 <a href="#4-1-submitting-a-url">Submitting a URL</a></p>
                    <p>4.2 <a href="#4-2-submitting-text">Submitting Text</a></p>
                    <p>4.3 <a href="#4-3-submitting-a-file">Submitting a File</a></p>
                    <p>4.4 <a href="#4-4-choosing-your-models">Choosing Your Models</a></p>
                    <p>4.5 <a href="#4-5-submission">Submission</a></p>
                <h3 id="5-reading-your-results"><strong>5. Reading your Results</strong></h3>
                    <p>5.1 <a href="#5-1-trustworthiness-score">Trustworthiness Score</a></p>
                    <p>5.2 <a href="#5-2-text-extraction-display">Text Extraction Display</a></p>
                    <p>5.3 <a href="#5-3-model-results">Model Results</a></p>
                <h3 id="6-user-account"><strong>6. User Account</strong></h3>
                    <p>6.1 <a href="#6-1-why-create-an-account">Why Create an Account</a></p>
                    <p>6.2 <a href="#6-2-registering-an-account">Registering an Account</a></p>
                    <p>6.3 <a href="#6-3-logging-into-your-account">Logging into your Account</a></p>
                    <p>6.4 <a href="#6-4-logging-out">Logging out</a></p>
                <h3 id="7-user-history"><strong>7. User History</strong></h3>
                <h3 id="8-contact-us"><strong>8. Contact Us</strong></h3>
                    <p>8.1 <a href="#8-1-submitting-a-message">Submitting a Message</a></p>
                    <p>8.2 <a href="#8-2-where-does-the-message-go">Where does your message go</a></p>
            </div>
            <div>
                <div>
                    <h2 id="introduction"><strong>Introduction</strong></h2>
                        <h3 id="1-1-what-is-keepitreal"><strong>1.1 What is KeepItREAL</strong></h3>
                            <p>KeepItREAL is the name we chose to give our webpage. This webpage utilises pre-exisiting models to help determine whether or not a news source can be trusted. The user can submit content, through many different means, which we extract all the necessary data and ship it off to these models. Upon receiving these responses we calculate our final overall result of the &quot;trustworthiness&quot; of the source you have provided.</p>
                        <h3 id="1-2-our-goal"><strong>1.2 Our Goal</strong></h3>
                            <p>Our goal was simple, in this day and age users such as yourself struggle to decipher the difference between fake news and real news leading to much paranoia around the news. We decided to offer this helping hand to guide you through this digital media age and give a second opinion on the truth behind the content you are reading. We try make the platform as accessible as possible so its free for everyone to use. The results are laid out in a fashion that will help you, the user, understand how trustworthy the content is and how we came about calculating this result.</p>
                        <h3 id="1-3-what-to-expect-from-the-manual"><strong>1.3 What to expect from the Manual</strong></h3>
                            <p>This manual is provided to you to explain the platform as a whole, teach you how to submit the content you wish to be analysed, how to interpret your results and depending on if you decide to create an account we will also show you how to access and manage your history.</p>
                </div>
                <div>
                    <h2 id="system-requirments"><strong>System Requirments</strong></h2>
                        <p>KeepItREAL is a web-based application so it does not require you to download anything, all users will need is internet access and are meeting the following requirements to ensure that it runs smoothly.</p>
                        <h3 id="2-1-web-browsers"><strong>2.1 Web Browsers</strong></h3>
                            <p>KeepItREAL operates on all modern browsers listed below:</p>
                                <ul className="list-disc pl-6">
                                    <li>Google Chrome</li>
                                    <li>Microsoft Edge</li>
                                    <li>Safari</li>
                                    <li>Mozilla FireFox</li>
                                </ul>
                            <p>However it may not include older browsers such as Internet Explorer.</p>
                        <h3 id="2-2-device-requirements"><strong>2.2 Device Requirements</strong></h3>
                            <p>Since KeepItREAL is a web-based application it can used across many devices including:</p>
                                <ul className="list-disc pl-6">
                                    <li>Laptops or Desktops</li>
                                    <li>Tablets</li>
                                    <li>Smartphones</li>
                                </ul>
                            <p>With this in mind we do recommend using some form of laptop or desktop when attempting to load larger files for submission to enhance performance on your end.</p>
                        <h3 id="2-3-internet-connection"><strong>2.3 Internet Connection</strong></h3>
                            <p>In General, we recommend users access this webapp through Wi-Fi to ensure a stable connection. Internet is required for all operations of this webapp including:</p>
                                <ul className="list-disc pl-6">
                                    <li>Submitting URLs, text or files</li>
                                    <li>Running analysis on your content</li>
                                    <li>Creating/Accessing an account</li>
                                    <li>Accessing User History </li>
                                    <li>Viewing Results</li>
                                </ul>
                        <h3 id="2-4-supported-file-types"><strong>2.4 Supported File Types</strong></h3>
                            <p>KeepItREAL can only handle certain file types for extraction of content to be analysed these include:</p>
                                <ul className="list-disc pl-6">
                                    <li>PDF (&#39;.pdf&#39;)</li>
                                    <li>PowerPoint (&#39;.pptx&#39;)</li>
                                    <li>Word Documents (&#39;.docx&#39;)</li>
                                    <li>Markdown (&#39;.md&#39;)</li>
                                    <li>HTML (&#39;.html&#39;, &#39;.htm&#39;)</li>
                                    <li>Text File (&#39;.txt&#39;)</li>
                                </ul>
                            <p>For all other file types the user will be displayed an error message indicating that the file type is not supported for our webapp.</p>
                        <h3 id="2-5-user-account"><strong>2.5 User Account</strong></h3>
                            <p>KeepItREAL offer users the opportunity to create an account however <strong>this is not required</strong> to submit a request. However creating an account and logging in offers some added benefits such as:</p>
                                <ul className="list-disc pl-6">
                                    <li>Storing analysed results.</li>
                                    <li>Accessing previously submitted requests.</li>
                                    <li>Deleting previous results from your history.</li>
                                </ul>
                </div>
                <div>
                    <h2 id="3-getting-started">3 Getting Started</h2>
                    <p>The purpose of this section is to inform you on the basics of how to use KeepItREAL.</p>
                    <h3 id="3-1-accessing-the-platform"><strong>3.1 Accessing the Platform</strong></h3>
                        <ol className="list-decimal pl-6">
                            <li>First step, access your preferred web browser.</li>
                            <li>Proceed to the KeepItREAL homepage.</li>
                            <li>If you wish to login or register feel free to do so now, if not you can still submit your content and receive results.</li>
                        </ol>
                    <h3 id="3-2-creating-an-account-optional"><strong>3.2 Creating an Account (Optional)</strong></h3>
                        <ol className="list-decimal pl-6">
                            <li>From any page you should see Register | Login in the top right hand corner of the page/navbar.</li>
                            <li>Click &#39;Register&#39; and enter your email, username, password and repeat the same password for confirmation.</li>
                            <li>Next press the blue &#39;Register&#39; button at the bottom.</li>
                            <li>Once completed you will receive a notification/message on the screen of its success/failure.</li>
                            <li>Once registered login with your email and password.</li>
                        </ol>
                    <h3 id="3-3-understanding-the-interface"><strong>3.3 Understanding the Interface</strong></h3>
                    <p>On the homepage you will be in the submission area, here you have many things happening. On the left hand side we have the different types of submission including:</p>
                        <ul className="list-disc pl-6">
                            <li>The one you will open your page on the URL submission</li>
                            <li>Then next we have the raw text submission where you type or copy and paste text into</li>
                            <li>Finally we have the file submission</li>
                        </ul>
                        <p>You will be required to select which form of input you wish to pick and this can be done by tapping on the labelled tabs. Then we on the right hand side we show to the user the differnt models we offer with a brief explanation of each one.</p>
                    <h3 id="3-4-selecting-models"><strong>3.4 Selecting Models</strong></h3>
                    <p>As previously mentioned the user has the different analysis models we offer on the right hand side of the submission/home page. Here the user can select which models they wish to use from the list of:</p>
                        <ul className="list-disc pl-6">
                            <li><strong>PULK</strong> - This is a fake/real classifier.</li>
                            <li><strong>Sentiment</strong> - This will analyse the emotional tone of the text.</li>
                            <li><strong>Bias Detector</strong> - This detects 11 different forms of bias and we display the most prominent form.</li>
                            <li><strong>Human/AI Classifier</strong> - This determines whether the code was written by a human or was synthetically created by an AI.</li>
                        </ul>
                    <p>You can select as many or as few models as you like with a minimum of one. If you attempt to submit with no models selected you will shown an error message.</p>
                    <h3 id="3-5-running-your-first-analysis"><strong>3.5 Running your first Analysis</strong></h3>
                        <ol className="list-decimal pl-6">
                            <li>Choose which form of content you wish to provide from text, URL or upload a file</li>
                            <li>Select which models you wish to partake in the analysis</li>
                            <li>Press the &#39;Submit Article&#39; button displayed beneath.</li>
                            <li>A loading screen will appear while waiting for results</li>
                            <li>You will be automatically redirected to your results page</li>
                        </ol>
                    <h3 id="3-6-viewing-understanding-your-results"><strong>3.6 Viewing/Understanding your results</strong></h3>
                    <p>Once you have gone through the stages of submission you will be redirected to the results page where you will see:</p>
                        <ul className="list-disc pl-6">
                            <li>A trustworthiness score between 0-100 aided by a progress bar</li>
                            <li>A breakdown of the results from each model (also accompanied by progress bars)</li>
                            <li>A snippet of the extracted text you submitted to ensure you submitted the correct content</li>
                            <li>A title if provided by the submitted content</li>
                        </ul>
                    <p>If you are logged into your account this result will <strong>automatically save to your User History</strong></p>
                </div>
                <div>
                    <h2 id="4-submitting-for-analysis">4 Submitting for Analysis</h2>
                    <p>Now that you have a basic understanding of the user interface we will move onto the more in depth aspects of creating a submission to be analysed. There is three different options for submission and you only use one.</p>
                        <h3 id="4-1-submitting-a-url"><strong>4.1 Submitting a URL</strong></h3>
                        <p><img src={URL_submission} alt="Figure 4.1 - Submitting a URL"></img>
                        This is our first form of submission for when you want to analyse an online news article or webpage</p>
                        <ol className="list-decimal pl-6">
                            <li>When opening submission page it is automatically set to URL (if not tap on the tab labelled &#39;URL&#39;)</li>
                            <li>You will see a box with the light grey text &quot;Enter your URL here...&quot;, this is where you paste or type the URL.</li>
                            <li>Then on the right side the you tap on which models you wish to use</li>
                            <li>Press the green &quot;Submit Article&quot; button to start the analysis.</li>
                        </ol>
                    <h3 id="4-2-submitting-text"><strong>4.2 Submitting Text</strong></h3>
                    <p><img src={Text_submission} alt="Figure 4.2 - Submitting Text"></img>
                    This is the second form of submission for when you want to analyse a piece of text such as a paragraph or the content is not online. (For more accurate results paste/type a lengthy amount of text)</p>
                        <ol className="list-decimal pl-6">
                            <li>Click on the dark blue/grey tab labelled &#39;Text&#39;, beside the URL tab.</li>
                            <li>Inside the box you should see text saying &quot;Paste your article here...&quot; here you can type or paste the text you wish to fact check</li>
                            <li>Then on the right side the you tap on which models you wish to use</li>
                            <li>Press the green &quot;Submit Article&quot; button to start the analysis.</li>
                        </ol>
                    <h3 id="4-3-submitting-a-file"><strong>4.3 Submitting a File</strong></h3>
                    <p><img src={File_submission} alt="Figure 4.3 - Submitting a File"></img>
                    This is the final form of submission for when the content is locally stored on your device</p>
                        <ol className="list-decimal pl-6">
                            <li>Click on the dark blue/grey tab labelled &#39;File&#39;, beside the Text tab</li>
                            <li>Click on the box outlined with a broken line and has the text &quot;Choose File No file chosen&quot;</li>
                            <li>Pick one of your files that is supported by our webpage see <a href="#24-supported-file-types">here</a>.</li>
                            <li>Then on the right side the you tap on which models you wish to use</li>
                            <li>Press the green &quot;Submit Article&quot; button to start the analysis.</li>
                        </ol>
                    <h3 id="4-4-choosing-your-models"><strong>4.4 Choosing Your Models</strong></h3>
                    <p><img src={Model_selection} alt="Figure 4.4 - Choosing Models"></img>
                    Before you submit your content you must make sure you have selected <strong>at least one model</strong>, your options are:</p>
                        <ul className="list-disc pl-6">
                            <li>Fake News Analysis: Analysis for fake news patterns using a detection model with 99.58% accuracy on its trained data</li>
                            <li>Sentiment Analysis: Analysis on the emotional tone of a news source whether it is positive, negative or neutral</li>
                            <li>Bias Analysis: Analysis for patterns of many different forms of bias in a news source, forms of bias include:
                                <ul className="list-disc pl-6">
                                    <li>Racial</li>
                                    <li>Religious</li>
                                    <li>Gender</li>
                                    <li>Age</li>
                                    <li>Nationality</li>
                                    <li>Sexuality</li>
                                    <li>Socioeconomic</li>
                                    <li>Educational</li>
                                    <li>Disability</li>
                                    <li>Political</li>
                                    <li>Physical</li>
                                </ul>
                            </li>
                            <li>AI Generation Analysis: Analysis of AI Generated Content in a news source</li>
                        </ul>
                    <h3 id="4-5-submission"><strong>4.5 Submission</strong></h3>
                        <ul className="list-disc pl-6">
                            <li>Once you have completed one of the three forms of submission you will be taken to a loading screen while you wait for your results.</li>
                            <li>Once the results have been calculateed you will automatically be redirected to the results page.</li>
                            <li>This submission will be automatically saved if you are logged into your account.</li>
                        </ul>   
                </div>
                <div>
                    <h2 id="5-reading-your-results">5 Reading your Results</h2>
                    <p>Once you have gone through the different stages of submission you will be automatically redirected to the results page where you will receive a trustworthiness score and a breakdown of the results got from each model. The purpose of this page is to show you the result and explain how we go it.
                    <img src={Trustworthiness} alt="Figure 5.1 - Trustworthiness bar"></img></p>
                        <h3 id="5-1-trustworthiness-score"><strong>5.1 Trustworthiness Score</strong></h3>
                            <p>At the top of the page under the <strong>Trustworthiness Score</strong> heading you will see a number between 0-100 accompanied by a percentage symbol. This is your &quot;Trustworthiness Score&quot;. The progress bar beneath that is a visual aid of how trustworthy it is being that if the bar is full it is very trustworthy. The colour of the bar will also change starting at a red to orange to yellow to green transition meant to represent going from bad to good.</p>
                            <p>This score is calulated from combining all the results of the models you selected. Each model carries a certain level of importance (weighting) to ensure that the final result is best represented by the model outputs.</p>
                            <p>Then beneath this we have our results breakdown broken into two sections
                    <img src={Extracted_text} alt="Figure 5.2 - Extracted Text"></img></p>
                        <h3 id="5-2-text-extraction-display"><strong>5.2 Text Extraction Display</strong></h3>
                            <p>On the left hand side beneath the heading &#39;Submitted Articel&#39; we have a demonstration of our text extraction, it shows:</p>
                            <ul className="list-disc pl-6">
                                <li>The extracted heading (If there is one).</li>
                                <li>The first 300 words of text (presuming there is 300 words).</li>
                                <li>This helps verify that it is the correct text you wanted analysed.</li>
                            </ul>
                        <h3 id="5-3-model-results"><strong>5.3 Model Results</strong></h3>
                        <p>On the right hand side of the screen you will see results form the 4 different models we offer:
                        <img src={Real_or_fake} alt="Figure 5.3.1 - Real or Fake"></img></p>
                        <ul className="list-disc pl-6">
                            <li>Pulk Model: Titled &quot;REAL or FAKE?&quot; analyses the articles claims and detects the accuracy of the facts based on detected patterns, it includes:
                                <ul className="list-disc pl-6">
                                    <li>Heading - REAL or FAKE?</li>
                                    <li>The outcome: will display either REAL or FAKE beneath the heading</li>
                                    <li>Progress Bar: Indicating the result received from the model between 0-100</li>
                                    <li>A small description of what the result actually means</li>
                                </ul></li>
                        </ul>
                        <img src={Sentiment} alt="Figure 5.3.2 - Sentiment"></img>
                        <ul className="list-disc pl-6">
                            <li>Sentiment Model: Titled &quot;Sentiment&quot; measures the overall emotional tone of the article and how strongly this emotion was conveyed through article will raise the confidence of the result, it also includes:
                                <ul className="list-disc pl-6">
                                    <li>Heading - Sentiment</li>
                                    <li>The outcome: will display either Positive, Negative or Neutral</li>
                                    <li>Progress Bar: Indicating the result received from the model between 0-100</li>
                                    <li>A small description of what the result actually means</li>
                                </ul>
                            </li>
                        </ul>
                        <img src={Bias} alt="Figure 5.3.3 - Bias"></img>
                        <ul className="list-disc pl-6">
                            <li>Bias Model: Titled &quot;Bias Type&quot; analyses for the 11 different forms of bias and chooses the most prominent form, these are all given different levels of importance by us because some have a higher correlation to fake news, this model includes:
                                <ul className="list-disc pl-6">
                                    <li>Heading - Bias Type</li>
                                    <li>The outcome: will be one of the 11 forms of bias see <a href="#44-choosing-your-models">here</a></li>
                                    <li>Progress Bar: Indicating the result received from the model between 0-100</li>
                                    <li>A small description of what the result actually means</li>
                                </ul>
                            </li>
                        </ul>                   
                        <img src={Gpt} alt="Figure 5.3.4 - AI or Human"></img>
                        <ul className="list-disc pl-6">
                            <li>Hello Simple AI Model: Titled &quot;AI or Human?&quot; represents whether or not the article was written by a human or generated by AI, and the confidence it has in this result, it includes:
                                <ul className="list-disc pl-6">
                                    <li>Heading - AI or Human?</li>
                                    <li>The outcome: Will either be AI or it will be Human displayed beneath the heading</li>
                                    <li>Progress Bar: Indicating the result received from the model between 0-100</li>
                                    <li>A small description of what the result actually means</li>
                                </ul>
                            </li>
                        </ul>
                </div>
                <div>
                    <h2 id="6-user-account">6 User Account</h2>
                        <p>The ability to create an account with KeepItREAL is completely optional, but doing so does gain you access to some features that the website offers, here we will talk about those features and what they include.</p>
                        <h3 id="6-1-why-create-an-account"><strong>6.1 Why Create an Account</strong></h3>
                        <p>Creating an account gives you these added benefits:</p>
                            <ul className="list-disc pl-6">
                                <li>Saving Results: If you log in after every submission your results will be automatically saved meaning you do not have to worry about losing them.</li>
                                <li>Account History: All of your past results will be tied to your account so that you can can scroll through previous submissions saving you have to resubmit the same article multiple times</li>
                                <li>Deleting past submissions: If there are certain submissions you do not want to be tied to your account you can simply delete them allowing the user to have complete control over what results we store</li>
                                <li>Access through other devices: Since all of your history is linked to the account rather than the device the user can access and edit the history from any device they have logged in through</li>
                            </ul>
                        <img src={Register} alt="Figure 6.2 - Register"></img>
                        <h3 id="6-2-registering-an-account"><strong>6.2 Registering an Account</strong></h3>
                        <p>When choosing to register an account follow these simple steps:</p>
                            <ol className="list-decimal pl-6">
                                <li>First access the homepage/submission page</li>
                                <li>Click &quot;Register&quot; in the top right hand corner within the navigation bar</li>
                                <li>Enter your email, username, password and confirm your password on the right hand side of the page</li>
                                <li>Click the blue &quot;Register&quot; button beneath the confirm your password textbox</li>
                                <li>Once registered you can use your email and password to login</li>
                            </ol>
                        <p>Once logged in all of your submissions will start to be saved. On the left hand side of the page you will see just above our logo the option to log in if you already have an account.</p>
                        <img src={Login} alt="Figure 6.3 - Login"></img>
                        <h3 id="6-3-logging-into-your-account"><strong>6.3 Logging into your Account</strong></h3>
                        <p>The steps to take to log into your account include:</p>
                            <ol className="list-decimal pl-6">
                                <li>First access the homepage/submission page</li>
                                <li>Click &quot;Login&quot; in the top right hand corner within the navigation bar</li>
                                <li>Enter your email and password to login</li>
                                <li>Click the blue &quot;Log in&quot; button beneath the &quot;Your Password&quot; text box</li>
                                <li>Once logged in the top right corner options will change to just &quot;Logout&quot;</li>
                            </ol>
                        <p>On the left hand side of the page you will see just above our logo the option to register if you do not have an account </p>
                        
                        <h3 id="6-4-logging-out"><strong>6.4 Logging Out</strong></h3>
                        <p>The steps to take when logging out of your account include:</p>
                            <ol className="list-decimal pl-6">
                                <li>Once you have first logged in you will see the option to Logout in the top right corner where &quot;Register | Login&quot; used to be.</li>
                                <li>Click that logout button</li>
                                <li>The top right hand corner will change back to &quot;Register | Login&quot;</li>
                            </ol>
                </div>
                <div>
                    <h2 id="7-user-history">7 User History</h2>
                </div>
                <div>
                    <h2 id="8-contact-us">8 Contact us</h2>
                    <img src={Contact_us} alt="Figure 8.0 - Contact Us Page"></img>
                    <p>We have implemented a contact us form page so that users can reports issues or give feedback on the webpage. This information will help us further develop and future proof our web-based application</p>
                        <h3 id="8-1-submitting-a-message"><strong>8.1 Submitting a Message</strong></h3>
                        <p>The contact us form can be accessed through the navigation bar found between the &quot;Help&quot; section and the &quot;History&quot; section, you will be required to submit:</p>
                            <ul className="list-disc pl-6">
                                <li>Your Username</li>
                                <li>Your email</li>
                                <li>The subject of the message</li>
                                <li>The message itself</li>
                            </ul>
                        <p>Once all these details have been entered you simply press the blue &quot;Send Message&quot; button.</p>
                    <h3 id="8-2-where-does-the-message-go"><strong>8.2 Where does the Message go</strong></h3>
                    <p>Once you have submitted a message through the contact form page currently it is being stored in its own table within our database. We do this so:</p>
                        <ul className="list-disc pl-6">
                            <li>Admin can access and view your message</li>
                            <li>The submission is confidential</li>
                            <li>We may contact you with the provided email</li>
                        </ul>
                </div>
            </div>
        </div>

    )

}

export default Help;