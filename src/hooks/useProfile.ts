import { useQuery } from "@tanstack/react-query";
import { getProfile, type Profile } from "@/lib/api/profile";

export function useProfile() {
    return useQuery<Profile>({
        queryKey: ["profile"],
        queryFn: getProfile,
    });
}
