import TeamMemberInvite from "../../creators/team-invite/TeamMemberInvite"

const Team = () => {
  return (
    <section>
        <TeamMemberInvite />
        <p className="text-sm text-justify text-gray3 pb-2"><strong>Teammates </strong>are shown as part of the team on your page but do not have admin access or get notifications. They have profile page on the platform.</p>
        <p className="text-sm text-justify text-gray3"><strong>Admins </strong>can edit settings, approve expenses, and receive activity notifications (such as when a new expense is submitted). They are the active managers of a Collective.</p>
    </section>
  )
}
export default Team