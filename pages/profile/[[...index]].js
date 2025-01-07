import { UserProfile, useUser, useClerk, Protect } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function ProfilePage() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        // Clear all local storage items
        localStorage.clear();

        // Sign out from Clerk with complete session termination
        await signOut({
            sessionId: 'all'
        });

        // Optional: Clear any cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        router.push("/cancer-type/chromophobe");
    };

    if (!user) return <div>Loading...</div>;

    // Get primary email address
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const isAdmin = userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;


    return (
        <div className="container mx-auto p-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                {/* <Protect permission="org:sys_domains:manage" > */}
                {isAdmin && (
                    <h2 className="text-3xl">You are an Admin</h2>
                )}

                {/* </Protect> */}

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            className="h-16 w-16 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
                            {user.publicMetadata?.roles && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Roles: {Array.isArray(user.publicMetadata.roles)
                                        ? user.publicMetadata.roles.join(', ')
                                        : user.publicMetadata.roles}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none p-0",
                            },
                        }}
                    />
                </div>

                <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
