import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./FAQ.module.css";
import { FAQS } from "../../data/landingData";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>FAQ</span>

          <h2>
            Questions,
            <br />
            answered.
          </h2>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, index) => (
            <div key={faq.q} className={styles.item}>
              <button className={styles.question} onClick={() => toggle(index)}>
                <span>{faq.q}</span>

                <Plus
                  size={16}
                  className={`${styles.icon} ${
                    open === index ? styles.open : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className={styles.answer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
