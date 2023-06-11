#pragma once
#include <functional>
#include <memory>
#include <span>

// #include "networking.hpp"

namespace rofi::hal {


class Connector {
public:
    class Implementation {
    protected:
        ~Implementation() = default;

    public:
        // virtual ConnectorState getState() = 0;
        virtual void connect() = 0;
        virtual void disconnect() = 0;
    };

    void connect() {
        printf("Connecting");
    }

    void disconnect() {
        printf("Disconnecting");
    }
};


class Joint {
public:

    double getVelocity() {
        printf("Joint::getVelocity %f\n", this->velocity);
        return this->velocity;
    }

    void setVelocity( double  velocity ) {
        printf("Joint::setVelocity %f\n", velocity);
        this->velocity = velocity;
    }



    float getPosition() {
        printf("Joint::getPosition\n");
        return this->position;
    }


    void setPosition( float pos, float velocity, std::function< void( Joint ) > callback )
    {
        printf("Joint::setPosition\n");
        this->position = pos;
        this->velocity = velocity;
    }


    float getTorque() {
        printf("Joint::getTorque\n");
        return this->torque;
        }
    void setTorque( float torque ) {
        printf("Joint::setTorque\n");
        this->torque = torque;
    }




private:
    float velocity = 0.0f;
    float position = 0.0f;
    float torque = 0.0f;
};


class RoFI {
public:
    using Id = int;

    Id getId() const {
        return id;
    }

    Joint getJoint( int i ) {
        printf("RoFI::getJoint\n");
        return joint[i];
    }

    Connector getConnector( int i ) {
        printf("RoFI::getConnector\n");
        return connector[i];
    }


private:
    Id id;
    Connector connector[3];
    Joint joint[3];
};

} // namespace rofi::hal