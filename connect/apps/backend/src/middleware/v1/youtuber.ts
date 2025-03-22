import jwt from "jsonwebtoken";

export const isYoutuber = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 🔴 No token present in the request headers
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        // Verify token
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) as unknown as { userId: string; role: string };

        // Attach user to the request
        req.user = decoded;  

        // Check role
        if (req.user.role !== "youtuber") {
            return res.status(403).json({ error: "Forbidden: Not a youtuber" });
        }
        
        next(); // ✅ Move to the next middleware

    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
