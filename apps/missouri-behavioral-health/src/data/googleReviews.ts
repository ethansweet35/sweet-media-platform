/**
 * Google reviews from the live site Trustindex widget (missouribehavioralhealth.com).
 * Re-sync: scrape homepage Trustindex template or update manually.
 */
export type GoogleReview = {
  name: string;
  text: string;
  rating: 5;
};

/** Public Google Maps listing — opens reviews. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Missouri+Behavioral+Health/@37.1951054,-93.2634275,17z/data=!4m8!3m7!1s0x87cf7bd3f9223d63:0xd03a593edb0a6b70!8m2!3d37.1951054!4d-93.2634275!9m1!1b1";

export const GOOGLE_REVIEWS_SUMMARY = {
  label: "Excellent",
  ratingValue: 5,
  reviewCount: 29,
} as const;

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Janna Wood",
    rating: 5,
    text: "I live in Texas and when my son was struggling MBH came to our rescue. They have been absolutely amazing and has helped my son so very much. Thanks to them and the willingness work my son has put in and their support, he has graduated the program and is now sober and moving forward with a new outlook. If you or someone you know is struggling with addiction please reach out and call them! They will help! Thank you Daniel and Andrew for your care and help during a difficult struggle!",
  },
  {
    name: "Larry Lock",
    rating: 5,
    text: "This is a great place to help with recovery! Knowledgeable, empathetic and kind hearted staff!!! Can't say enough about the positive growth I have obtained while here! Would definitely recommend to anyone trying to achieve and maintain change!!!",
  },
  {
    name: "Jordan Romine",
    rating: 5,
    text: "Amazing and empathetic staff that genuinely care about you. I would recommend anybody go here. Daniel, Jake, Morgan, Derek, and Emily are amazing! I also appreciate Phillip and hippie Jake for coming in for meditation and yoga with us. If you want to feel strong and supported on your path to recovery whether that includes substance use or mental health or both, go here!!!!",
  },
  {
    name: "Avery Elliston",
    rating: 5,
    text: "MBH was part 2 of a life changing experience for me. A perfect place for you or a loved one who may be going through a difficult time. The staff are very nice, and very accommodating. If it wasn't for MBH I wouldn't have pushed myself to be the best person I could be.",
  },
  {
    name: "Kevin Orellana",
    rating: 5,
    text: "Missouri Behavioral Health has been absolutely outstanding. From the moment I walked in, the staff was warm, welcoming, and genuinely dedicated to helping their clients. The therapists take the time to truly listen, offer thoughtful guidance, and create a safe, supportive environment. Their approach is compassionate, personalized, and incredibly effective. I've felt real progress thanks to their care, and I'm grateful for the professionalism and respect shown at every visit. The facility is clean, organized, and calming—exactly what you want when seeking support for mental and emotional well-being. I highly recommend Missouri Behavioral Health to anyone looking for quality mental health services. They truly go above and beyond!",
  },
  {
    name: "John Singer",
    rating: 5,
    text: "I have worked in the behavioral health field for quite some time and when I relapsed and got out of treatment I was offered MBH for outpatient services. They helped me navigate how to remain sober again. The staff are compassionate and very helpful. I would recommend anyone to attend their services.",
  },
  {
    name: "Austin Chavarro",
    rating: 5,
    text: "The staff actually cares and treats you like a real human being.",
  },
  {
    name: "Kelsi Kinney",
    rating: 5,
    text: "The staff at Missouri Behavioral Health provide quality substance use services to each of their clients & their loved ones. The staff are attentive, well-trained, and truly care about the well-being of each individual who walks through their door. The modality is different than what we see in the Midwest, and it's assuring to know their team is providing care in a way that make a real impact.",
  },
  {
    name: "Matt Miller",
    rating: 5,
    text: "Daniel is absolutely the best.",
  },
  {
    name: "Matt Ourth",
    rating: 5,
    text: "Great staff that does a good job of guiding alcoholics to the Solution for their problem.",
  },
];
