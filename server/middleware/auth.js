export const protectAdmin = async (req, res, next) => {
    const { clerkClient } = require("@clerk/clerk-sdk-node");
    try {
        const { userId } = req.auth();
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = await clerkClient.users.getUser(userId);
        if (user.privateMetadata.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Not admin" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};



