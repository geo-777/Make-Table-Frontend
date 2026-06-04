import styles from "./MyProfile.module.css";
import DetailsGrid from "../../features/dashboard/components/detailsGrid/DetailsGrid";
import "../../styles/appLayout.css";
import Topbar from "../../shared/components/topbar/Topbar";
import { useTimetableData } from "../../features/dashboard/hooks/useTimetableData";
import { useAuth } from "../../app/providers/AuthProvider";
import { TriangleAlert, User, Mail, Calendar, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
const MyProfile = () => {
  const { timetableListings, publishedTimeTables, draftTimeTables } =
    useTimetableData();

  const { userData } = useAuth();

  const joinedAt = useMemo(() => {
    const date = new Date(userData?.created_at);

    if (isNaN(date.getTime())) {
      return "\u2014";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  }, [userData]);

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page="My Profile" />

        <div className="main">
          <div className={`fadeInUp fast ${styles.user}`}>
            <span className={styles.profilePic}>
              {userData?.username?.slice(0, 2)?.toUpperCase() ?? (
                <TriangleAlert size={16} />
              )}
            </span>

            <div className={styles.userInfographics}>
              <h2>{userData?.username ?? "\u2014"}</h2>
              <div className={styles.userInfographics__extras}>
                <span>
                  <Mail size={18} />
                  <p>{userData?.email ?? "\u2014"}</p>
                </span>

                <span>
                  <Calendar size={18} />
                  <p>{joinedAt ?? "\u2014"}</p>
                </span>
              </div>
            </div>
          </div>

          <DetailsGrid
            data={{
              total: timetableListings?.data?.length,
              published: publishedTimeTables?.length,
              drafts: draftTimeTables?.length,
            }}
          />

          <div className={`fadeInUp fast ${styles.accountCard}`}>
            <h3>Account information</h3>

            <div className={styles.infoRow}>
              <div className={styles.infoLeft}>
                <div className={styles.iconWrapper}>
                  <User size={18} />
                </div>

                <div>
                  <p className={styles.infoTitle}>Username</p>
                  <p className={styles.infoDescription}>
                    Username used to login
                  </p>
                </div>
              </div>

              <span className={styles.infoValue}>
                {userData?.username ?? "—"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLeft}>
                <div className={styles.iconWrapper}>
                  <Mail size={18} />
                </div>

                <div>
                  <p className={styles.infoTitle}>Email</p>
                  <p className={styles.infoDescription}>Login address</p>
                </div>
              </div>

              <span className={styles.infoValue}>{userData?.email ?? "—"}</span>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLeft}>
                <div className={styles.iconWrapper}>
                  <Calendar size={18} />
                </div>

                <div>
                  <p className={styles.infoTitle}>Member since</p>
                  <p className={styles.infoDescription}>
                    Account creation date
                  </p>
                </div>
              </div>

              <span className={styles.infoValue}>{joinedAt}</span>
            </div>
          </div>

          <div className={`fadeInUp fast ${styles.actionBtns}`}>
            <Link to={"/settings"} className={styles.secondaryBtn}>
              <p>More settings</p>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
