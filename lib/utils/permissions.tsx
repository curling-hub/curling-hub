import { AccountType } from "../models/accountType"
import AdminLayout from "../../components/layouts/AdminLayout";
import HostLayout from "../../components/layouts/HostLayout";
import TeamLayout from "../../components/layouts/AdminLayout";
import StandardLayout from "../../components/layouts/StandardLayout";

export function landingPageLayout(accountType: AccountType, id?: number | null) {
    switch (accountType) {
        case AccountType.ADMIN:
            return <AdminLayout />
        case AccountType.HOST:
            return <HostLayout hostId={id} />
        case AccountType.TEAM:
            return <TeamLayout teamId={id} />
    }
    return <StandardLayout />
}