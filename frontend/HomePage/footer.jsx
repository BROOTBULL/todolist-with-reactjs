export default function Footer()
{
    return(<>
        <hr style={{width:"90%",borderWidth:"2px"}}/>
        <div className="footer">
            
            <div className="head text ">
             <i className="bx bxs-book-alt"></i> TodoList
            <div className="hero_description">Join millions of people who organize work and life with Todoist.
            </div>
            </div>

            <div className="footer_Options text">
                <div className="options_Box"><span>Features</span>
                    <div className="option">How it works</div>
                    <div className="option">About Us</div>
                    <div className="option">Pricing</div>
                </div>
                <div className="options_Box"><span>Contact Us</span>
                    <div className="option"><i className='bx bxl-facebook-square'></i> Facebook</div>
                    <div className="option"><i className='bx bxl-instagram'></i> Instagram</div>
                    <div className="option"><i className='bx bxl-linkedin-square'></i> Linkedin</div>
                </div>
            </div>
        </div>
        <hr style={{width:"95%"}}/>
        <div className="text copyright">
        <span>Security</span> | <span>Privacy</span> | <span>Terms </span> © BrootBull
        </div>
        <hr style={{width:"95%"}}/>
    </>)
}