"use server";

import { getAdminSession } from "../actions";

// In a real app, this would update a database
const MOCK_USERS_DB: any[] = [];

export async function completeUserProfile(formData: FormData) {
    const session = await getAdminSession();
    if (!session || !session.isLoggedIn) {
        throw new Error("Not authenticated");
    }

    const phone = formData.get('phone');
    const address = formData.get('address');
    const shirtSize = formData.get('shirtSize');

    // Find user and update their profile
    const userIndex = MOCK_USERS_DB.findIndex(u => u.email === session.email);
    
    if (userIndex !== -1) {
        MOCK_USERS_DB[userIndex] = {
            ...MOCK_USERS_DB[userIndex],
            phone,
            address,
            shirtSize,
            isProfileCompleted: true,
        };
    } else {
        // If user not in DB (edge case), add them
        MOCK_USERS_DB.push({
            ...session,
            phone,
            address,
            shirtSize,
            isProfileCompleted: true,
        });
    }

    console.log("Updated User DB:", MOCK_USERS_DB);
    // In a real app, you would re-set the cookie with the updated session
    return { success: true };
}
