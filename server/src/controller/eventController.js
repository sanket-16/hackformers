const bcrypt = require('bcryptjs'); // used to hash/encrypt the password
const prisma = require('../prisma')
const jwt = require('jsonwebtoken');

const eventController = {
    createEvent: async (req, res) => {
        try {
            
            const{ title, location, description, images, date, organizationId} = req.body;

            const existingOrganization = await prisma.organization.findUnique({ where: { id: organizationId } });
            if (!existingOrganization) {
                return res.status(404).json({ error: "Organization not found" });
            }

            const event = await prisma.event.create({
                data: {
                    title: title,
                    location: location,
                    description: description,
                    images: images,
                    status: "PENDING",
                    date: date,
                    organization: { connect: { id: organizationId } },
                    users:{
                        connect:{
                            id:req.user.id
                        }
                    }
                }
            });
            res.status(200).json({ event });
        } catch (error) {
            console.log("Event Creation error",error);
            res.status(500).json({ "internal Server Error": error })
        }
    },

    getEvent: async(req,res) =>{
        try {
            const {id} = req.params;
            const event = await prisma.event.findUnique({
                where: {
                    id: id
                }
            })
            res.status(200).json({event})
        } catch (error) {
            res.status(500).json({"Internal Server Error": error})
        }
    },

    updateUserinEvent:async(req,res)=>{

        try {
            const { eventId } = req.params;
            const { userEmail } = req.body;
      
            // Check if organization and organizer exist
            // const organizationExists = await prisma.organization.findUnique({ where: { id: organizationId } });
            const userExists = await prisma.user.findUnique({ where: { email: userEmail } });
      
            if (!userExists) {
              return res.status(404).json({ error: "User  not found" });
            }
      
            // Add the organizer to the organization's list of organizers
            console.log(userExists)
            
            const updateEvent = await prisma.event.update({
              where: { id: eventId },
              data: {
                users: {
                  connect: { id: userExists.id } // Connect organizer to organization
                }
              }
            });
      
            res.status(200).json({ message: "successful", updateEvent });
          } catch (error) {
            console.error("Error adding :", error);
            res.status(500).json({ error: "Unable to add" });
          }
    },
    updateStatus : async(req,res)=>{
        try {
            const{status} = req.body;
            const{id} = req.params;
            const event = await prisma.event.update({
                where:{
                    id:id
                },
                data:{
                    status:status
                }
            })
            res.status(201).json({event});
        } catch (error) {
            console.error("server error", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    eventAccordingOrg: async(req,res)=>{
        try {
            const {organizationId} = req.body;
            const events = await prisma.event.findMany({
                where:{
                    organizationId: organizationId
                },
                include:{
                    organization: true,
                    users: true
                }
            })
            res.status(200).json({events})
        } catch (error) {
            console.log(error)
            res.status(500).json({"Internal Server Error": error})
        } 
    },
    addParticipants:async(req,res)=>{

        try {
            const { eventId } = req.params;
            const { userId } = req.body;
      
            // Check if organization and organizer exist
            // const organizationExists = await prisma.organization.findUnique({ where: { id: organizationId } });
            const userExists = await prisma.user.findUnique({ where: { id:userId } });
      
            if (!userExists) {
              return res.status(404).json({ error: "User  not found" });
            }
      
            // Add the organizer to the organization's list of organizers
            console.log(userExists)
            
            const updateEvent = await prisma.event.update({
              where: { id: eventId },
              data: {
                participants: {
                  connect: { id: userExists.id } // Connect organizer to organization
                }
              }
            });
      
            res.status(200).json({ message: "Participant added successfully", updateEvent });
          } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Unable to add" });
          }
    },
    userCreatedEvents :async(req,res)=>{

    try {
        const events = await prisma.event.findMany({
            where:{
                userIds:{
                    has:req.user.id
                }
            }
        })
        // JSON.parse(events);
        // console.log(events);
        
        res.status(201).json({events});
    } catch (error) {
        console.log(error);
        res.status(501).json({error});
    } 


    },
    participatedEvents :async(req,res)=>{

    try {
        const events = await prisma.event.findMany({
            where:{
                participantsIds:{
                    has:req.user.id
                }
            }
        })
        // JSON.parse(events);
        // console.log(events); 
        res.status(201).json({events});
    } catch (error) {
        console.log(error);
        res.status(501).json({error});
    } 


    },
    getValidEvents : async(req,res)=>{

        try {
            const events = await prisma.event.findMany({
                where:{
                    date:{
                        gte:new Date().toISOString()
                    }
                }
            });
            console.log(Date.now)
            res.status(201).json({events});
        } catch (error) {
            console.log(error);
            res.status(501).json({error});
        }
    }
}

module.exports = {eventController};