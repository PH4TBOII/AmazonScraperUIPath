window.onload = () => {
    //initialize the robot
    UiPathRobot.init()
    
    //get processes and select the amazon scraper
    UiPathRobot.getProcesses().then(results => {
        if(results.length === 0) {
            throw new Error("No Processes found")
        }

        amazonScraper = results.find(res => res.name.includes("Scrape Amazon"))

        if(!amazonScraper) {
            throw new Error("Amazon Scraper not found")
        }
    }, err => {
        console.err(err.what())
    })

    document.querySelector("#robot-form").addEventListener("submit", function (event) {
        event.preventDefault()
        runRobot(amazonScraper)
    }, false)
}

const runRobot = (robot) => {
    let args = {
        itemCount: parseInt(document.querySelector('#item-count').value)
    }

    if(!args.itemCount) {
        args = null
    }

    console.log(args)

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