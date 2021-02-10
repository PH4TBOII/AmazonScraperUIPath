window.onload = () => {
    //initialize the robot
    UiPathRobot.init()
    
    //get processes and select the amazon scraper
    UiPathRobot.getProcesses().then(results => {
        //throw an error if no processes were found
        if(results.length === 0) {
            throw new Error("No Processes found")
        }

        //select the amazon scraper from the list of processes
        amazonScraper = results.find(res => res.name.includes("Scrape Amazon"))

        //throw an error if the amazon scraper was not found.
        if(!amazonScraper) {
            throw new Error("Amazon Scraper not found")
        }
    }, err => {
        console.err(err.what())
    })

    //add event listener to the form
    document.querySelector("#robot-form").addEventListener("submit", function (event) {
        //prevent default behavior of form submission to stop a page reload
        event.preventDefault()
        runRobot(amazonScraper)
    }, false)
}

const runRobot = (robot) => {
    let args = {
        //the number of items to be scraped from Amazon
        itemCount: parseInt(document.querySelector('#item-count').value)
    }

    //check if an argument was given and replace with null if none were
    if(!args.itemCount) {
        args = null
    }

    console.log(args)

    //start the robot and log the status / results / errors
    robot.start(args)
    .onStatus(status => {
        console.log(status)
    })
    .then(results => {
        console.log("Job Complete")
        console.log(results)
    }, 
    err => {
        console.err(err.what())
    })
}