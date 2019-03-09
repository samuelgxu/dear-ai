<img width="318" alt="screen shot 2019-02-04 at 5 53 41 pm" src="https://user-images.githubusercontent.com/31573030/52242892-e8164800-28a5-11e9-9baa-5e3ec6542c86.png">

View the SlideDeck for this project [here](https://docs.google.com/presentation/d/1G1M9v0Vk2-tAhulnirHIsoivKq3WK7E2tx3RZW12Zas/edit?usp=sharing).

View images of our web interface at the bottom of this file.

## Inspiration / Why

It is no surprise that mental health has been a prevailing issue in modern society. 16.2 million adults in the US and 300 million people in the world have depression according to the World Health Organization. Nearly 50 percent of all people diagnosed with depression are also diagnosed with anxiety. Furthermore, anxiety and depression rates are a rising issue among the teenage and adolescent population. About 20 percent of all teens experience depression before they reach adulthood, and only 30 percent of depressed teens are being treated for it.

To help battle for mental well-being within this space, we created DearAI. Since many teenagers do not actively seek out support for potential mental health issues (either due to financial or personal reasons), we want to find a way to  inform teens about their emotions using machine learning and NLP and recommend to them activities designed to improve their well-being.

## Our Product:

To help us achieve this goal, we wanted to create an app that integrated journaling, a great way for users to input and track their emotions over time. Journaling has been shown to reduce stress, improve immune function, boost mood, and strengthen emotional functions. Journaling apps already exist, however, our app performs sentiment analysis on the user entries to help users be aware of and keep track of their emotions over time.

Furthermore, every time a user inputs an entry, we want to recommend the user something that will lighten up their day if they are having a bad day, or something that will keep their day strong if they are having a good day. As a result, if the natural language processing results return a negative sentiment like fear or sadness, we will recommend a variety of prescriptions from meditation, which has shown to decrease anxiety and depression, to cat videos on Youtube. We currently also recommend dining options and can expand these recommendations to other activities such as outdoors activities (i.e. hiking, climbing) or movies.

**We want to improve the mental well-being and lifestyle of our users through machine learning and journaling.This is why we created DearAI.**

## Implementation / How
Research has found that ML/AI can detect the emotions of a user better than the user themself can. As a result, we leveraged the power of IBM Watson’s NLP algorithms to extract the sentiments within a user’s textual journal entries. With the user’s emotions now quantified, DearAI then makes recommendations to either improve or strengthen the user’s current state of mind. The program makes a series of requests to various API endpoints, and we explored many APIs including Yelp, Spotify, OMDb, and Youtube. Their databases have been integrated and this has allowed us to curate the content of the recommendation based on the user’s specific emotion, because not all forms of entertainment are relevant to all emotions.

For example, the detection of sadness could result in recommendations ranging from guided meditation to comedy. Each journal entry is also saved so that users can monitor the development of their emotions over time.

## Future
There are a considerable amount of features that we did not have the opportunity to implement that we believe would have improved the app experience. In the future, we would like to include video and audio recording so that the user can feel more natural speaking their thoughts and also so that we can use computer vision analysis on the video to help us more accurately determine users’ emotions. Also, we would like to integrate a recommendation system via reinforcement learning by having the user input whether our recommendations improved their mood or not, so that we can more accurately prescribe recommendations as well. Lastly, we can also expand the APIs we use to allow for more recommendations.

## Screenshots
![img](https://user-images.githubusercontent.com/31573030/52242740-805ffd00-28a5-11e9-83cc-649314468acc.png)
![img1](https://user-images.githubusercontent.com/31573030/52242741-805ffd00-28a5-11e9-9696-e9d935998347.png)
![img2](https://user-images.githubusercontent.com/31573030/52242742-805ffd00-28a5-11e9-88ca-dbe4e237a74d.png)
![img3](https://user-images.githubusercontent.com/31573030/52242743-805ffd00-28a5-11e9-81a2-e6ea444d49a2.png)
