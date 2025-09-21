
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";


const authCient = createAuthClient({
    baseURL: "http://localhost:3000", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "linguaboost:mobile",
            storagePrefix: "linguaboost:mobile",
            storage: SecureStore,
        })
    ]
});
export default authCient;


// // Export hooks for client usage
// export const { useSession } = authClient;