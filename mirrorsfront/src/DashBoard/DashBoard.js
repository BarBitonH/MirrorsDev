import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {notificationTypes} from "../assets/notificationTypes.js";

const DashboardWrapper = styled(motion.div)`
  position: relative; // Setting up for absolute positioned child elements
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 50px;
  border-radius: 20px;

  // Complex background
  background:
          radial-gradient(circle at top left, rgba(255,255,255,0.3), transparent),
          radial-gradient(circle at bottom right, rgba(255,255,255,0.3), transparent),
          linear-gradient(45deg, #f3ec78, #af4261),
          url('../assets/woman_login.png');
  background-blend-mode: screen, screen, normal, normal;

  // Complex box-shadow
  box-shadow:
          0 4px 6px rgba(0, 0, 0, 0.1),
          0 10px 20px rgba(0, 0, 0, 0.2),
          inset 0 2px 4px rgba(255, 255, 255, 0.2);

  &::before { // An animated pseudo-element
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(60deg, #f3ec78, #af4261);
    z-index: -1; // Behind the main content
    background-size: 200% 200%;
    animation: movingGradient 5s infinite alternate;
  }

  & > div {
    background-color: rgba(255, 255, 255, 0.8); // Slightly transparent panels
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px); // Slight blur effect

    // Hover effect with transitions
    transition: transform 0.2s, box-shadow 0.2s, backdrop-filter 0.3s;
    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
    }
  }

  @keyframes movingGradient {
    from {
      background-position: 100% 50%;
    }
    to {
      background-position: 50% 100%;
    }
  }
`;

const Header = styled.header`
  transform: translateY(0);
  transition: transform 0.3s;
  color: #3498db; // This is just a sample color.
  font-weight: bold;
  position: relative;
  width: 78%;
  padding: 20px 0;
  background-color: white;
  text-align: center;
  font-size: 2em;

  &:hover {
    transform: translateY(-2px);
  }
  &:after {
    content: '';
    position: fixed;
    bottom: -5px;
    left: 0;
    width: 60%;
    height: 3px;
    background: #3498db;
    opacity: 0.6;
  }
`;

const Content = styled.main`
  width: 75%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const TitleWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;

  h2 {
    font-size: 2em;
    transform: translateY(0);
    transition: transform 0.3s;
    color: #3498db; // This is just a sample color.
    font-weight: bold;
    position: relative;
    
    &:hover {
      transform: translateY(-2px);
    }
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 60%;
      height: 3px;
      background: #3498db;
      opacity: 0.6;
    }
  }

  span.subtitle {
    font-size: 1em;
    color: #7f8c8d;
  }

  img.icon {
    width: 30px;
    height: 30px;
    filter: grayscale(0.8) brightness(0.8);
    transition: filter 0.3s;

    &:hover {
      filter: grayscale(0) brightness(1);
    }
  }
`;

const TitleText = styled(motion.h1)`
  font-size: 24px;
  color: #2c3e50;
`;

const SubtitleText = styled(motion.h2)`
  font-size: 18px;
  color: #7f8c8d;
`;

function Title({ titleText, subtitleText }) {
    return (
        <TitleWrapper>
            <TitleText>{titleText}</TitleText>
            <SubtitleText>{subtitleText}</SubtitleText>
        </TitleWrapper>
    );
}

// UserProfile Section
const UserProfileWrapper = styled(Section)`
  display: flex;
  gap: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function UserProfile({ avatar, name, email }) {
    return (
        <UserProfileWrapper>
            <Avatar src={avatar} alt={name} />
            <UserInfo>
                <strong>{name}</strong>
                <span>{email}</span>
            </UserInfo>
        </UserProfileWrapper>
    );
}

// Tasks Section
const Task = styled.div`
    padding: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

function TaskList({ tasks }) {
    return (
        <Section>
            <Title titleText="Tasks" subtitleText="Your to-do list" />
            {tasks.map(task => (
                <Task key={task.id}>{task.name}</Task>
            ))}
        </Section>
    );
}
const CalendarWrapper = styled(Section)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function CalendarOverview() {
    return (
        <CalendarWrapper>
            <Title titleText="Calendar Overview" subtitleText="Your upcoming events" />
            {/* Here you would typically render a calendar component or event list */}
            <p>Dummy Calendar Placeholder</p>
        </CalendarWrapper>
    );
}

// Notifications Section
const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Styling for Individual Notification
const NotificationItem = styled(motion.div)`
    padding: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => notificationTypes[props.type].color}20; // Light tint of the priority color
    cursor: pointer;
    
    &:hover {
      &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      }    }
`;

const NotificationText = styled.div`
    display: flex;
    align-items: center;
`;

const NotificationIcon = styled.span`
    font-size: 1.2em;
    margin-right: 10px;
    color: ${props => notificationTypes[props.type].color};
`;

const Timestamp = styled.time`
    font-size: 0.8em;
    color: gray;
`;
function  Notifications({ notifications }) {
    return (
        <Section>
            <Title titleText="Notifications" subtitleText="Recent alerts and updates" />
            <NotificationList>
                {notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <NotificationText>
                            <NotificationIcon type={notification.type}>
                                {notificationTypes[notification.type]?.icon || ''}
                            </NotificationIcon>
                            {notification.message}
                        </NotificationText>
                        <Timestamp>{notification.timestamp}</Timestamp>
                    </NotificationItem>
                ))}
            </NotificationList>
        </Section>
    );
}

// User Feedback Section
const FeedbackWrapper = styled(Section)`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

function UserFeedback({ feedbacks }) {
    return (
        <FeedbackWrapper>
            <Title titleText="User Feedback" subtitleText="Reviews and Comments" />
            {feedbacks.map(feedback => (
                <div key={feedback.id}>
                    <strong>{feedback.user}</strong>: {feedback.message}
                </div>
            ))}
        </FeedbackWrapper>
    );
}

const QuickAction = styled.button`
    padding: 10px 15px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2980b9;
    }
    &:active {
      transform: scale(0.95);
    }
`;

function QuickActions() {
    return (
        <Section>
            <Title titleText="Quick Actions" subtitleText="Frequently used operations" />
            <div>
                <QuickAction>Add New Task</QuickAction>
                <QuickAction>View Reports</QuickAction>
                <QuickAction>Manage Users</QuickAction>
            </div>
        </Section>
    );
}
// RecentActivities Section
function RecentActivities({ activities }) {
    return (
        <Section>
            <Title titleText="Recent Activities" subtitleText="Track your recent actions" />
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>{activity.action}</li>
                ))}
            </ul>
        </Section>
    );
}

// Analytics Section (Placeholder)
function Analytics() {
    return (
        <Section>
            <Title titleText="Analytics" subtitleText="Insights and Overview" />
            {/* Here you would typically render your pie chart or other analytics component */}
            <p>Dummy Pie Chart Placeholder</p>
        </Section>
    );
}

function Dashboard() {

    const dummyTasks = [
        { id: 1, name: "Design new logo" },
        { id: 2, name: "Update react version" },
        { id: 3, name: "Contact new clients" },
    ];

    const dummyActivities = [
        { id: 1, action: "Logged in" },
        { id: 2, action: "Updated profile" },
        { id: 3, action: "Created a new task" },
    ];
    const dummyNotifications = [
        { id: 1, message: "Your profile was viewed by 3 users", type: "info", timestamp: "10:00 AM" },
        { id: 2, message: "New feedback received", type: "success", timestamp: "11:00 AM" },
        { id: 3, message: "System update next week", type: "warning", timestamp: "12:00 PM" },
    ];
    const dummyFeedbacks = [
        { id: 1, user: "Alice", message: "Loving the new features!" },
        { id: 2, user: "Bob", message: "Had some issues with loading times." },
        { id: 3, user: "Charlie", message: "Dashboard is very intuitive." },
    ];

    return (
        <DashboardWrapper>
            <Header>Dashboard</Header>
            <Content>
                <UserProfile avatar="path_to_avatar.jpg" name="John Doe" email="john.doe@example.com" />
                <TaskList tasks={dummyTasks} />
                <RecentActivities activities={dummyActivities} />
                <CalendarOverview />
                <Notifications notifications={dummyNotifications} />
                <UserFeedback feedbacks={dummyFeedbacks} />
                <Analytics />
                <QuickActions />
            </Content>
        </DashboardWrapper>
    );
}


export default Dashboard;
