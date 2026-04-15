module.exports = function (model) {
    let module = {};

    module.viewDashBoard = async function (request, response) {
        try {

            return response.status(200).json({
                status: 200,
                data: {
                    Blog: 20,
                    JobOpen: 5,
                    Franchise: 20,
                    ResumeWritten: 100
                },
                message: 'Dashboard Data',
            });

        } catch (error) {
            console.error("viewDashBoard error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }


    }


    return module
}