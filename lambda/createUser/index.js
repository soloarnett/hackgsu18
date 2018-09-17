exports.handler = async (event) => {
    // TODO implement
    return await createUser(event)
}

function createUser(event) {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: "hackspurt-nvirginia.cow10jzdxl36.us-east-1.rds.amazonaws.com",
        user: "hackspurtadmin",
        password: "4XeAK14LGtg9rYLXZG8afAHTi$kpaJe",
        database: "hackspurtdev",
    })
    
    let escape = (val) => {
        return connection.escape(val)
    }

    let queryList = {}
    let query = 'INSERT INTO hackgsu_users '
    

    if(!event.pushUID, !event.os){
        queryList.os = 3
        query += setQueryString(true, queryList)
    }else{
        switch(event.os.toLowercase()){
            case 'ios':
                queryList.os = 1
                break
            case 'android':
                queryList.os = 2
                break
        }
        queryList.pushUID = escape(event.pushUID)
        query += setQueryString(false, queryList)
    }

    connection.query(query, function (error, results, fields) {
        if (error) {
            connection.destroy()
            throw error
        } else {
            // connected!
            console.log(results)
            // callback(error, results)
            connection.end(function (err) {
                if (err) {
                    return {
                        statusCode: 500,
                        data: err
                    }
                } else {
                    return {
                        statusCode: 200,
                        data: results
                    }
                }
            })
        }
    })
}

function setQueryString(isWeb, queryList){
    if(isWeb){
        return '(os) VALUES ('+ queryList.os +')'
    }else{
        return '(os, pushUID)'
    }
}

function getAllFromQueryList(queryList){
    let queryString = ""
    Object.keys(queryList).map((x) => {
        // if function is breaking, ensure that this list isn't so long that this call needs to be wrapped in a promise - viraj
        queryString += queryList[x] + ","
    })
    queryString.substring(0, queryString.length - 1)
    return queryString
}
