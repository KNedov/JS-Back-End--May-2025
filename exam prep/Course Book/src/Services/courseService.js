import Course from "../models/Course.js";


export default {
    async getAll(filter = {}) {
        let query = Course.find();

        if (filter.search) {
            query = query.find({
                name: { $regex: filter.search, $options: "i" },
            });
        }
        

        return query;

        // const courses= await Course.find();

        // if(filter.search){
        //     courses = courses.filter(course => course.name.toLowerCase().includes(filter.search.toLowerCase()))
        // }
        // return courses
    },

    getLatest() {
        return Course.find().sort({ _id: -1 }).limit(3);
    },
    getOne(courseId) {
        return Course.findById(courseId);
    },
      getById(courseId) {
        return  Course.findById(courseId);
        
        
        
    },
     getOwnerForCourse(courseId) {
        return  Course.findById(courseId);
        
        
        
    },

    create(courseData, ownerId,user) {
        return Course.create({ ...courseData, owner: ownerId });
    },

    async sign(courseId, userId) {
        const course = await this.getOne(courseId);
        // Check if owner
        if (course.owner.equals(userId)) {
            throw new Error("Owners cannot sing up!");
        }
        course.signUpList.push(userId);
        return course.save();
      
    },
    async delete(courseId, userId) {
        const course = await this.getOne(courseId);

        if (!course.owner.equals(userId)) {
            throw new Error("Only owner can delete this course!");
        }
        return Course.findByIdAndDelete(courseId);
    },
    async edit(courseId, courseData, userId) {
        // Check if owner
        const course = await Course.findById(courseId);
        if (!course.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this course!");
        }
        return Course.findByIdAndUpdate(courseId, courseData, {
            runValidators: true,
        });
    },
    async getCreatedCourses(userId) {
        try {
            const created = await Course.find({ owner: userId });
            return created;
        } catch (err) {
            console.error("Error while fetching created Courses:", err);
            throw err;
        }
    },
    async getSignedCourse(userId) {
        try {
            const signed = await Course.find({ signUpList: userId });
            return signed;
        } catch (err) {
            console.error("Error while fetching preferred Courses:", err);
            throw err;
        }
    },
};
