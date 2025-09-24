import Booking from "../models/Booking.js";
import Show from "../models/Show.js"

const checkSeatsAvailability = async (showId, selectedSeats) => {
    try{
        const showData = await Show.findById(showId);
            if (!showData) {
                throw new Error("Show not found");
            }
            const occupiedSeats = showData.occupiedSeats;;
            const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);
            return !isAnySeatTaken; // Return true if all seats are available
        } catch (error) {
            console.error(error.message);
            return false;
        }
}

export const createBooking = async (req, res)=> {
    try{
        const {userId} = req.auth();
        const {showId , selectedSeats , amount} = req.body;
        const {origin} = req.headers;

        // Check seat availability;

        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({ error: "Selected seats are not available" });
        }

        // Proceed with booking creation

        const showData = await Show.findById(showId).populate('movie');
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.price * selectedSeats.length,
            bookedseats: selectedSeats,
        })
        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = true;
        })
        showData.markModified('occupiedSeats');
        await showData.save();

        // payment gateway integration can be done here
        res.json({ success:true , message: "Booking created successfully"})
    } catch (error) {
        console.error(error.message);
        return res.json({ error: "Internal server error" });
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showData = await Show.findById(showId);
        const occupiedSeats = Object.keys(showData.occupiedSeats);
        if (!showData) {
            return res.json({ error: "Show not found" });
        }
        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message:error.message });
    }
}

// Add your booking controller logic here
