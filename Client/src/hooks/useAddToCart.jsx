/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";

export const useAddToCart = () => {
    const { user } = useContext(AuthContext);
    const { data: catData, refetch, isLoading } = useQuery({
        queryKey: ['addToCart'], queryFn: async () => {
            const response = await fetch(`http://localhost:5000/cart/${user?.email}`);
            const data = await response.json();
            return data;
        }
    })
    return [catData, refetch, isLoading]
}