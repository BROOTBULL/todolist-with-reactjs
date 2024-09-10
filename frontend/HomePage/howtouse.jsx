export default function HowtoUse() {
  return (
    <>
      <div className="howtouse">
        <div className="tutorial">
          <div className="text tutorial_text">
            Capture tasks at the speed of thought
            <div className="text tutorial_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>

          <div
            style={{ 
                backgroundImage: "url(../public/media/addtask.png)",
                 backgroundPosition:"right"
            }}
            className="tutorial_image"
          />
        </div>

        <div className="tutorial">
          <div
            style={{ 
                backgroundImage: "url(../public/media/editsection.png)",
                backgroundPosition:"center"
             }}
            className="tutorial_image"
          />

          <div className="text tutorial_text">
            Arrange your tasks according to sections
            <div className="text tutorial_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore exercitation
              laborum.
            </div>
          </div>
        </div>

        <div className="tutorial">
          <div className="text tutorial_text">
            Stay uptodate about your tasks
            <div className="text tutorial_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore quis nostrud
              exercitation laborum.
            </div>
          </div>

          <div
            style={{ backgroundImage: "url(../public/media/project.png)"}}
            className="tutorial_image"
          />
        </div>
      </div>
    </>
  );
}
