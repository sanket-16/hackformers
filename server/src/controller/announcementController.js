const bcrypt = require('bcryptjs'); // used to hash/encrypt the password
const prisma = require('../prisma')
const jwt = require('jsonwebtoken');
const { connect } = require('http2');

const announmentController = {
    createAnnouncment: async(req, res) =>{
        try {
            const{title, description, time, eventId} =req.body;
            const announcement  = await prisma.announcement.create({
                data:{
                    title,
                    description,
                    time,
                    event:{connect:{id: eventId}}
                }
            })
            res.status(200).json({announcement})
        } catch (error) {
            console.log(error)
            res.status(500).json({"Internal error message": error})
        }
       
    },

    getAnnouncement: async(req,res)=>{
        try {
            const{eventId} = req.params;
            const announcement = await prisma.announcement.findUnique({
                where:{
                    eventId: eventId 
                }
            })
            res.status(200).json({announcement});
        } catch (error) {
            console.log(error)
            res.status(500).json({"Internal Error": error});
        }
     
    }
}

module.exports = {announmentController}