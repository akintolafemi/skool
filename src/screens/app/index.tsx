import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, SafeAreaView, ScrollView, Text } from 'src/components/themed.components';
import { useAppSelector } from 'src/hooks/useReduxHooks';
import { RootStackScreenProps } from 'src/types/navigation.types';
import AppThemeContext from 'src/contexts/Theme.context';
import { StatusBar } from 'expo-status-bar';
import Animated, { BounceIn, FadeIn, FadeInRight, RotateInUpLeft, RotateInUpRight, SlideInUp } from 'react-native-reanimated';
import colorsConstants from 'src/constants/colors.constants';
import fontUtils from 'src/utils/font.utils';
import { DefaultButton } from 'src/components/buttons.components';
import { LinearProgress } from '@rneui/themed';
import { ScreenHeader } from 'src/components/headers.components';
import { AntDesign, Entypo } from '@expo/vector-icons';
import ImageView from "react-native-image-viewing"
import { OptionsSelect } from './components/options.component';
import { APP_QUIZZES } from 'src/constants/app.constants';
//@ts-ignore
import { MathText } from 'react-native-math-view';
import { PieChart } from "react-native-gifted-charts";
import { TouchableOpacity } from 'react-native-gesture-handler';
import layoutConstants from 'src/constants/layout.constants';
import { Modalize } from 'react-native-modalize';

export default function AppScreen({ 
  navigation, 
  route 
}: RootStackScreenProps<'AppScreen'>) {

  const theme = useContext(AppThemeContext)
  const user = useAppSelector((state) => state.auth.user)

  const modalRef = useRef<Modalize>(null)
  const modalRefResult = useRef<Modalize>(null)

  //show a welcome message before starting quiz
  const [ showWelcome, setShowWelcome ] = useState(true)
  //to show quiz image in a modal
  const [ mediaElementVisible, setMediaElementVisible ] = useState(false)
  //from quizzes repo, use this to hold current quiz index
  const [ quiz, setQuiz ] = useState(0)
  //for results repo
  const [ results, setResults ] = useState<any[]>([])
  //current question from quiz
  const [ activeQuestion, setActiveQuestion ] = useState(0)
  //user selected answer. uses option index
  const [ selectedAnswer, setSelectedAnswer ] = useState(-1)
  //all selected ansers from a single quiz
  //this would be used to calculate total score for current quiz
  const [ selectedAnswers, setSelectedAnswers ] = useState<any>({})
  //to display a timer
  const [ seconds, setSeconds ] = useState(0);
  //total anserts the user got correctly in ctive quiz
  const [ totalCorrectAnsers, setTotalCorrectAnsers ] = useState(0)
  //to display user result
  const [ showCorrectAnswers, setShowCorrectAnswers ] = useState(false)


  //use react useMemo callback to set active quiz from quizzes repo
  const activeQuiz = useMemo(() => {
    return APP_QUIZZES[quiz]
  }, [quiz])

  const questions = useMemo(() => {
    return activeQuiz.questions
  }, [activeQuiz])

  //using use effect to show timer
  //only show timer when the first question shows or a new quiz is started
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (!showWelcome && !showCorrectAnswers) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }  else if (showWelcome && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [quiz, seconds, showWelcome]);

  //diplaying timer in mins and seconds
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  //since we're showing a welcome message, change the view to questions view after 7secs
  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false)
    }, 7000);
  }, [])

  const doContinue = () => {
    modalRef?.current?.close()
    setResults([
      ...results,
      {
        title: activeQuiz.title,
        description: activeQuiz.description,
        totalQuestions: activeQuiz.questions.length,
        totalCorrectAnsers,
        selectedAnswers,
        percentageScore: (totalCorrectAnsers / activeQuiz.questions.length) * 100,
        timeSpent: seconds
      }
    ])
    if (quiz < APP_QUIZZES.length - 1) {
      setQuiz(quiz + 1)
      setActiveQuestion(0)
      setSelectedAnswers({})
      setSelectedAnswer(-1)
      setTotalCorrectAnsers(0)
      setSeconds(0)
    } else {
      modalRefResult?.current?.open()
    }
  }

  const doSubmit = () => {
    modalRef?.current?.open()
  }

  const doSelectAnswer = (index: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [activeQuestion]: index
    })
    setSelectedAnswer(index)
  }

  useEffect(() => {
    let correct = 0;
    for (const key in selectedAnswers) {
      const index = Number(key)
      const ans = Number(selectedAnswers[key])
      if (questions[index].options[ans] === questions[index].correctOption)
        correct ++
    }
    setTotalCorrectAnsers(correct)
  }, [activeQuestion, selectedAnswer])

  const changeQuestion = (index: number) => {
    setActiveQuestion(index)
    setSelectedAnswer(selectedAnswers[index])
  }

  const calculateCumulativeScore = useMemo(() => {
    let totalScore = 0;
    for (const result of results) {
      totalScore += result?.percentageScore
    }

    return (totalScore / (results?.length * 100)) * 100

  }, [results])

  const sortByKey = (array: any, key: string) => {
    return array.sort((a: any, b: any) => {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    });
  };

  //DUMMY leaderboard
  const leaderBoard = useMemo(() => {
    const board = [{
      name: `Becca Rodes`,
      score: 60,
    }, {
      name: `James Mike`,
      score: 50,
    }, {
      name: `Billard Coker`,
      score: 90,
    }, {
      name: `Araba Temie`,
      score: 60,
    }, {
      name: `You`,
      score: calculateCumulativeScore,
      avatar: user?.avatar
    }]

    //sort leaderboard from highest point to lowest
    return sortByKey(board, 'score')
  }, [calculateCumulativeScore])
  
  return (
    <SafeAreaView style={styles.container}
      edges={[]}
    >
      <StatusBar 
        translucent
        style={theme === `dark` ? `light` : theme === 'light' ? `dark` : `auto`}
      />
      {showWelcome ? (
        <Animated.View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: layoutConstants.mainViewHorizontalPadding
        }}>
          {`Hello ${user.firstname}`.split("").map((l, _i) => (
            <Animated.Text
              key={`${_i}`}
              entering={FadeInRight.delay((_i + 1) * 500).duration(500)}
              style={{
                color: colorsConstants.colorPrimary[900],
                fontSize: fontUtils.h(20),
                marginHorizontal: fontUtils.w(5),
                fontFamily: fontUtils.sfprodisplay_400
              }}
            >{l}</Animated.Text>
          ))}
        </Animated.View>
      ) : (
        <View style={{
          flex: 1,
        }}>
          <View style={{
            flex: 1,
            paddingHorizontal: layoutConstants.mainViewHorizontalPadding
          }}>
            <ScreenHeader
              title={`${activeQuiz.title}`}
              rightIconComponent={
                <View style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <Entypo name="stopwatch" size={fontUtils.h(18)} color="black" />
                  <Text style={{
                    fontSize: fontUtils.h(14),
                    marginLeft: fontUtils.w(5)
                  }}>
                    {`${formatTime(seconds)}`}
                  </Text>
                </View>
              }
            />
            <Text style={{
              fontSize: fontUtils.h(15),
              marginBottom: fontUtils.h(20),
              marginTop: fontUtils.h(10)
            }}>
              {activeQuiz.description}
            </Text>
            <ScrollView style={{
              marginTop: fontUtils.h(10)
            }}>
              <Image
                style={styles.mediaElement}
                onPress={() => setMediaElementVisible(true)}
                source={{
                  uri: questions[activeQuestion].image
                }}
              />
              <ImageView
                images={[{uri: questions[activeQuestion].image}]}
                imageIndex={0}
                visible={mediaElementVisible}
                onRequestClose={() => setMediaElementVisible(false)}
                presentationStyle='overFullScreen'
              />
              <MathText
                value={`${questions[activeQuestion].question}`}
              />
              {questions[activeQuestion].options.map((opt, _i) => (
                <OptionsSelect
                  key={`${_i}`}
                  label={opt}
                  selected={_i === selectedAnswer}
                  onSelect={() => doSelectAnswer(_i)}
                />
              ))}
              {showCorrectAnswers && (
                <View style={{
                  // marginTop: fontUtils.h(10)
                }}>
                  <MathText
                    value={`Correct Ans: ${questions[activeQuestion].correctOption}`}
                  />
                </View>
              )}
            </ScrollView>
          </View>
          <View style={{
            marginTop: fontUtils.h(10),
            paddingTop: fontUtils.h(10),
            paddingBottom: fontUtils.h(30),
            backgroundColor: colorsConstants.colorWhite,
            paddingHorizontal: layoutConstants.mainViewHorizontalPadding
          }}>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              {[{
                label: `Previous`,
                onPress: () => changeQuestion(activeQuestion - 1)
              }, {
                label: `Next`,
                onPress: () => changeQuestion(activeQuestion + 1)
              }].map((action, _i) => (
                <TouchableOpacity
                  key={`${_i}`}
                  activeOpacity={layoutConstants.activeOpacity}
                  onPress={action.onPress}
                  disabled={(activeQuestion === 0 && _i === 0) || (activeQuestion === questions.length - 1 && _i === 1)}
                >
                  <Text
                    style={{
                      fontSize: fontUtils.h(14),
                      opacity: (activeQuestion === 0 && _i === 0) || (activeQuestion === questions.length - 1 && _i === 1) ? 0.5 : undefined
                    }}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{
              alignSelf: `center`,
              marginVertical: fontUtils.h(10)
            }}>
              {`${activeQuestion + 1} of ${questions.length} Questions`}
            </Text>
            {!showCorrectAnswers && <LinearProgress
              color={colorsConstants.colorPrimary[900]}
              value={(activeQuestion + 1) / questions.length}
              variant='determinate'
              trackColor={colorsConstants.colorPrimary[100]}
              style={{
                height: fontUtils.h(5),
                borderRadius: fontUtils.h(5)
              }}
            />}
            <DefaultButton
              title={showCorrectAnswers ? `View Results` : `Submit`}
              onPress={showCorrectAnswers ? () => {
                modalRefResult?.current?.open()
              } : doSubmit}
              containerStyle={{
                marginTop: fontUtils.h(5)
              }}
              titleStyle={{
                color: colorsConstants.colorWhite
              }}
              disabled={!showCorrectAnswers && (activeQuestion < questions.length - 1 || selectedAnswer === undefined)}
            />
          </View>
        </View>
      )}
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        handlePosition={`inside`}
        handleStyle={{
          backgroundColor: colorsConstants.colorPrimary[900]
        }}
      >
        <Animated.View style={{
          alignItems: "center",
          marginTop: fontUtils.h(40),
          marginBottom: fontUtils.h(30)
        }}
          entering={BounceIn.duration(1000)}
        >
          <AntDesign name="exclamationcircleo" size={fontUtils.h(50)} color={colorsConstants.colorPrimary[900]} />
          <Text style={{
            fontSize: fontUtils.h(16),
            marginTop: fontUtils.h(10)
          }}>
            {`Submission`}
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            marginHorizontal: layoutConstants.mainViewHorizontalPadding,
            alignItems: "center",
            marginBottom: fontUtils.h(10)
          }}
          entering={SlideInUp.duration(1000)}
        >
          <Text style={{
            fontSize: fontUtils.h(14),
            color: colorsConstants.colorDanger
          }}>
            {`Hey ${user.firstname}, are you ready to submit?\nOnce submited, you won't be able to go back.`}
          </Text>
        </Animated.View>
        <View style={{
          marginBottom: fontUtils.h(80),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: fontUtils.h(20)
        }}>
          <Animated.View
            entering={RotateInUpLeft.duration(1000)}
            style={{
              alignItems: "center"
            }}
          >
            <Image
              source={require("src/assets/images/thinking.png")}
              style={{
                height: fontUtils.h(100),
                width: fontUtils.h(100)
              }}
              onPress={() => modalRef.current?.close()}
            />
            <Text>{`Not sure`}</Text>
          </Animated.View>
          <Animated.View
            entering={RotateInUpRight.duration(1000)}
            style={{
              alignItems: "center"
            }}
          >
            <Image
              source={require("src/assets/images/good.png")}
              style={{
                height: fontUtils.h(100),
                width: fontUtils.h(100),
              }}
              onPress={doContinue}
            />
            <Text>{`Submit`}</Text>
          </Animated.View>
        </View>
      </Modalize>
      <Modalize 
        ref={modalRefResult}
        withHandle={false}
        modalStyle={{
          minHeight: '100%',
        }}
        panGestureEnabled={false}
        childrenStyle={{
          paddingHorizontal: layoutConstants.mainViewHorizontalPadding,
          backgroundColor: colorsConstants[theme].screenGb
        }}
      >
        <ScreenHeader
          title={`Your Results are Here...`}
          rightIconComponent={
            <TouchableOpacity
              activeOpacity={layoutConstants.activeOpacity}
              onPress={() => {
                modalRefResult?.current?.close()
                setQuiz(0)
                setShowCorrectAnswers(false)
                setSeconds(0)
                setActiveQuestion(0)
                setSelectedAnswers({})
                setSelectedAnswer(-1)
                setResults([])
              }}
            >
              <Text style={{
                color:colorsConstants.colorPrimary[900]
              }}>
                {`Attempt again`}
              </Text>
            </TouchableOpacity>
          }
        />
        <View
          style={{
            alignItems: "center",
            marginBottom: fontUtils.h(10)
          }}
        >
          <PieChart
            data={[{
              value: calculateCumulativeScore || 0,
              // color: appColor[theme]
              color: colorsConstants.colorPrimary[900]
            }, {
              value: 100 - (calculateCumulativeScore || 0),
              color: colorsConstants.colorPrimary[100]
            }]}
            donut
            innerRadius={60}
            radius={70}
            centerLabelComponent={() => (
              <View style={{
                alignItems: "center"
              }}>
                <Text style={{
                  fontSize: fontUtils.h(20),
                }}>
                  {`${calculateCumulativeScore}%`}
                </Text>
                <Text>
                  {`${calculateCumulativeScore > 70 ? 'Genius' : 'Rookie'}`}
                </Text>
              </View>
            )}
          />
        </View>
        {results.map((result, _i) => (
          <TouchableOpacity
            activeOpacity={layoutConstants.activeOpacity}
            onPress={() => {
              modalRefResult?.current?.close()
              setQuiz(_i)
              setShowCorrectAnswers(true)
              setSeconds(result?.timeSpent)
              setActiveQuestion(0)
            }}
            key={`${_i}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colorsConstants.colorWhite,
              paddingHorizontal: fontUtils.w(10),
              paddingVertical: fontUtils.h(10),
              borderRadius: fontUtils.w(10),
              marginTop: fontUtils.h(10)
            }}
          >
            <PieChart
              data={[{
                value: result?.totalCorrectAnsers,
                // color: appColor[theme]
                color: colorsConstants.colorPrimary[900]
              }, {
                value: result?.totalQuestions - result?.totalCorrectAnsers,
                color: colorsConstants.colorPrimary[100]
              }]}
              donut
              innerRadius={30}
              radius={35}
              centerLabelComponent={() => (
                <Text style={{
                }}>
                  {`${result?.percentageScore}%`}
                </Text>
              )}
            />
            <View style={{
              flex: 1,
              marginHorizontal: fontUtils.w(15)
            }}>
              <Text style={{
                fontSize: fontUtils.h(16),
                marginBottom: fontUtils.h(5)
              }}>
                {`${result?.title}`}
              </Text>
              <Text>
                {`${result?.totalCorrectAnsers} of ${result?.totalQuestions} questions`}
              </Text>
            </View>
            <View style={{
              alignItems: "center"
            }}>
              <Image
                source={
                  result?.percentageScore > 50 ? require("src/assets/images/happy.png")
                  : require("src/assets/images/sad.png")
                }
                style={{
                  height: fontUtils.h(40),
                  width: fontUtils.h(40)
                }}
              />
              <Text>
                {result?.timeSpent <= 60 ? `${result?.timeSpent} secs` : `${Math.floor(result?.timeSpent / 60)} mins`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={{
          marginTop: fontUtils.h(20),
          fontSize: fontUtils.h(15),
          marginBottom: fontUtils.h(10)
        }}>
          {`Leaderboard`}
        </Text>
        {leaderBoard?.map((leader: { avatar: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; score: number; }, _i: number) => (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: fontUtils.h(10)
          }}
            key={`${_i}`}
          >
            <Text>
              {`${_i + 1}`}
            </Text>
            <Image
              source={leader?.avatar || require("src/assets/images/avatars/user-male.png")}
              style={{
                height: fontUtils.h(40),
                width: fontUtils.h(40),
                marginHorizontal: fontUtils.w(10),
                borderRadius: fontUtils.h(40)
              }}
            />
            <Text style={{
              flex: 1
            }}>
              {leader.name}
            </Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
              borderRadius: fontUtils.w(20),
              paddingHorizontal: fontUtils.w(10),
              paddingVertical: fontUtils.h(4)
            }}>
              <Entypo name="trophy" size={20} color="gold" />
              <Text style={{
                marginLeft: fontUtils.h(10)
              }}>{leader.score * 50}</Text>
            </View>
          </View>
        ))}
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0
  }, mediaElement: {
    height: fontUtils.h(150),
    width: `100%`,
    borderRadius: fontUtils.h(10),
    marginBottom: fontUtils.h(15)
  }
});
