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
      
            res.status(200).json({ message: "Organizer added to organization successfully", updateEvent });
          } catch (error) {
            console.error("Error adding organizer to organization:", error);
            res.status(500).json({ error: "Unable to add organizer to organization" });
          }
    }

}

module.exports = {eventController};