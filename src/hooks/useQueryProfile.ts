import {useContext, useEffect, useState} from "react";
import {NDKContext} from "@/components/NDKProvider";
import {NDKUser} from "@nostr-dev-kit/ndk";

const useQueryProfile = (npub: string): [NDKUser, boolean] => {
    const {ndkInstance} = useContext(NDKContext) as NDKContext
    const [fetching, setIsFetching] = useState<boolean>(false)
    const [ndkUser, setNDKUser] = useState<NDKUser>({} as NDKUser)

    useEffect(() => {
        (async () => {
            setIsFetching(true)
            const user = ndkInstance().getUser({npub})
            await user.fetchProfile()

            setNDKUser(user)
            setIsFetching(false)
        })()
    }, [])

    return [ndkUser, fetching]
}

export default useQueryProfile