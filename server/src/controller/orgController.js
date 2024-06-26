const bcrypt = require('bcryptjs'); // used to hash/encrypt the password
const prisma = require('../prisma')
const jwt = require('jsonwebtoken');

const orgController = { // user Authentication Controller 
  signup: async (req, res) => {
    console.log(req.body);
    try {
      const { name, email, password } = req.body;
      const hashed_password = bcrypt.hashSync(password, 10);
      const user = await prisma.organizer.create({
        data: {
          name: name,
          email: email,
          password: hashed_password,
        }
      })
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ "error": error })
      console.log(error);
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body
      // console.log(req.body);
      const user = await prisma.organizer.findUnique({
        where: {
          email: email
        }
      })
      console.log(user);
      if (!user) return res.status(401).json({ "error": "No user with this email" })
      if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ "error": "Incorrect Password" });


      const payload = {
        email: email,
        id: user.id,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(201).json({ "Message": "User Loged in Succesfully!!", user, "token": "Bearer " + token });
    } catch (error) {
      res.status(500).json({ "error": error });
    }
  },
  getOrg: async (req, res) => {
    try {
      // const { id } = req.params;
      const user = await prisma.organizer.findUnique({
        where: {
          id: req.user.id
        }
      })
      res.status(200).json({ user });

    } catch (error) {
      res.status(501).json({ "Message": "Internal Server Error" })
    }
  }
}

const organizationController = {

  createOrganization: async (req, res) => {

    try {
      const { name, description, images } = req.body;
      const leaderId = req.user.id;
      const organization = await prisma.organization.create({
        data: {
          name,
          description,
          images,
          leaderId,
          organizers: {
            connect:{id: leaderId}
          }
          // organizers:[leaderId]
        },

        include:{
          organizers: true
        }
      });
      res.status(201).json({ organization });
    } catch (error) {
      console.error("Error creating organization:", error);
      res.status(500).json({ error: "Unable to create organization" });
    }
  },

  addOrganizerToOrganization: async (req, res) => {
    try {
      const { organizationId } = req.params;
      const { organizerEmail } = req.body;

      // Check if organization and organizer exist
      // const organizationExists = await prisma.organization.findUnique({ where: { id: organizationId } });
      const organizerExists = await prisma.organizer.findUnique({ where: { email: organizerEmail } });

      if (!organizerExists) {
        return res.status(404).json({ error: "Organization or organizer not found" });
      }

      // Add the organizer to the organization's list of organizers
      console.log(organizerExists)
      
      const updatedOrganization = await prisma.organization.update({
        where: { id: organizationId },
        data: {
          organizers: {
            connect: { id: organizerExists.id } // Connect organizer to organization
          }
        },
        include: {
          organizers: true // Include organizers in the response
        }
      });

      res.status(200).json({ message: "Organizer added to organization successfully", updatedOrganization });
    } catch (error) {
      console.error("Error adding organizer to organization:", error);
      res.status(500).json({ error: "Unable to add organizer to organization" });
    }
  },
  getOrganization: async(req,res)=>{
    try {
      const{organizationId} = req.params;
      const organization = await prisma.organization.findUnique({
        where:{id:organizationId},
        include:{
          organizers:true
        }
      })
      res.status(201).json({organization})
    } catch (error) {
      console.log("Error finding Organization");
      res.status(501).json({"message":"Internal Server Error",error})
    }
  },

  showAllOrgs: async(req,res) =>{
    try {
      const org = await prisma.organization.findMany();
      res.status(200).json(org);

    } catch (error) {
      res.status(500).json({"message": "Internal Server Error", error})
    }
  }

}

module.exports = { orgController, organizationController };