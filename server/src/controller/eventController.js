const bcrypt = require('bcryptjs'); // used to hash/encrypt the password
const prisma = require('../prisma')
const jwt = require('jsonwebtoken');

const eventController = {
    createEvent: async (req, res) => {
        try {
            
            const{ title, location, description, images, date, organization} = req.body;

            const existingOrganization = await prisma.organization.findUnique({ where: { id: organization } });
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
                    organization: { connect: { id: organization } }
                }
            });
            res.status(200).json({ event });
        } catch (error) {
            console.log("Event Creation error",error);
            res.status(500).json({ "internal Server Error": error })
        }
    },

}

module.exports = {eventController};