// import express from 'express';
// import Group from '../models/Group.js';
// import User from '../models/User.js';
// import userAuth from '../middleware/userAuth.js';

// const router = express.Router();

// // Generate random 6-digit code
// const generateGroupCode = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // CREATE a new group
// router.post('/create', userAuth, async (req, res) => {
//   try {
//     const { groupName } = req.body;
    
//     if (!groupName) {
//       return res.status(400).json({ success: false, message: 'Group name is required' });
//     }

//     // Get user details
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Generate unique group code
//     let groupCode = generateGroupCode();
//     let existingGroup = await Group.findOne({ groupCode });
    
//     // Ensure code is unique
//     while (existingGroup) {
//       groupCode = generateGroupCode();
//       existingGroup = await Group.findOne({ groupCode });
//     }

//     // Create group with creator as first member
//     const group = new Group({
//       groupName,
//       groupCode,
//       createdBy: req.userId,
//       members: [{
//         userId: req.userId,
//         username: user.username
//       }]
//     });

//     await group.save();

//     res.status(201).json({ 
//       success: true, 
//       group,
//       message: `Group created successfully! Share code: ${groupCode}` 
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error creating group' });
//   }
// });

// // JOIN a group using code
// router.post('/join', userAuth, async (req, res) => {
//   try {
//     const { groupCode } = req.body;
    
//     if (!groupCode || groupCode.length !== 6) {
//       return res.status(400).json({ success: false, message: 'Valid 6-digit group code is required' });
//     }

//     // Get user details
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Find group
//     const group = await Group.findOne({ groupCode });
//     if (!group) {
//       return res.status(404).json({ success: false, message: 'Group not found. Please check the code.' });
//     }

//     // Check if user is already a member
//     const isMember = group.members.some(member => member.userId.toString() === req.userId);
//     if (isMember) {
//       return res.status(400).json({ success: false, message: 'You are already a member of this group' });
//     }

//     // Add user to group
//     group.members.push({
//       userId: req.userId,
//       username: user.username
//     });

//     await group.save();

//     res.status(200).json({ 
//       success: true, 
//       group,
//       message: `Successfully joined ${group.groupName}!` 
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error joining group' });
//   }
// });

// // GET user's groups
// router.get('/my-groups', userAuth, async (req, res) => {
//   try {
//     const groups = await Group.find({ 
//       'members.userId': req.userId 
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, groups });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error fetching groups' });
//   }
// });

// // GET leaderboard - Top 10 users by points
// router.get('/leaderboard', async (req, res) => {
//   try {
//     const topUsers = await User.find()
//       .select('username totalPoints')
//       .sort({ totalPoints: -1 })
//       .limit(10);

//     const leaderboard = topUsers.map((user, index) => ({
//       rank: index + 1,
//       username: user.username,
//       totalPoints: user.totalPoints || 0
//     }));

//     res.status(200).json({ success: true, leaderboard });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error fetching leaderboard' });
//   }
// });

// // GET group details by ID
// router.get('/:groupId', userAuth, async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.groupId);
    
//     if (!group) {
//       return res.status(404).json({ success: false, message: 'Group not found' });
//     }

//     // Check if user is a member
//     const isMember = group.members.some(member => member.userId.toString() === req.userId);
//     if (!isMember) {
//       return res.status(403).json({ success: false, message: 'You are not a member of this group' });
//     }

//     res.status(200).json({ success: true, group });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error fetching group' });
//   }
// });

// // LEAVE a group
// router.post('/leave/:groupId', userAuth, async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.groupId);
    
//     if (!group) {
//       return res.status(404).json({ success: false, message: 'Group not found' });
//     }

//     // Remove user from members
//     group.members = group.members.filter(member => member.userId.toString() !== req.userId);

//     // Delete group if no members left
//     if (group.members.length === 0) {
//       await Group.findByIdAndDelete(req.params.groupId);
//       return res.status(200).json({ success: true, message: 'Group deleted as no members remain' });
//     }

//     await group.save();
//     res.status(200).json({ success: true, message: 'Left group successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error leaving group' });
//   }
// });

// export default router;
import express from 'express';
import Group from '../models/Group.js';
import usermodal from '../models/usermodal.js'; // ✅ Fixed import - using your actual file name
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Generate random 6-digit code
const generateGroupCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// CREATE a new group
router.post('/create', userAuth, async (req, res) => {
  try {
    const { groupName } = req.body;
    
    if (!groupName) {
      return res.status(400).json({ success: false, message: 'Group name is required' });
    }

    // Get user details - using usermodal as per your schema
    const user = await usermodal.findById(req.userId).select('username');
    
    console.log('Found user:', user); // Debug log
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.username) {
      return res.status(400).json({ success: false, message: 'Username not found for user' });
    }

    // Generate unique group code
    let groupCode = generateGroupCode();
    let existingGroup = await Group.findOne({ groupCode });
    
    // Ensure code is unique
    while (existingGroup) {
      groupCode = generateGroupCode();
      existingGroup = await Group.findOne({ groupCode });
    }

    // Create group with creator as first member
    const group = new Group({
      groupName,
      groupCode,
      createdBy: req.userId,
      members: [{
        userId: req.userId,
        username: user.username
      }]
    });

    await group.save();

    res.status(201).json({ 
      success: true, 
      group,
      message: `Group created successfully! Share code: ${groupCode}` 
    });
  } catch (err) {
    console.error('Create group error:', err);
    res.status(500).json({ success: false, message: 'Server error creating group' });
  }
});

// JOIN a group using code
router.post('/join', userAuth, async (req, res) => {
  try {
    const { groupCode } = req.body;
    
    if (!groupCode || groupCode.length !== 6) {
      return res.status(400).json({ success: false, message: 'Valid 6-digit group code is required' });
    }

    // Get user details - using usermodal as per your schema
    const user = await usermodal.findById(req.userId).select('username');
    
    console.log('Found user for join:', user); // Debug log
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.username) {
      return res.status(400).json({ success: false, message: 'Username not found for user' });
    }

    // Find group
    const group = await Group.findOne({ groupCode });
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found. Please check the code.' });
    }

    // Check if user is already a member
    const isMember = group.members.some(member => member.userId.toString() === req.userId);
    if (isMember) {
      return res.status(400).json({ success: false, message: 'You are already a member of this group' });
    }

    // Add user to group
    group.members.push({
      userId: req.userId,
      username: user.username
    });

    await group.save();

    res.status(200).json({ 
      success: true, 
      group,
      message: `Successfully joined ${group.groupName}!` 
    });
  } catch (err) {
    console.error('Join group error:', err);
    res.status(500).json({ success: false, message: 'Server error joining group' });
  }
});

// GET user's groups
router.get('/my-groups', userAuth, async (req, res) => {
  try {
    const groups = await Group.find({ 
      'members.userId': req.userId 
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching groups' });
  }
});

// GET leaderboard - Top 10 users by points
router.get('/leaderboard', async (req, res) => {
  try {
    const topUsers = await usermodal.find()
      .select('username totalPoints')
      .sort({ totalPoints: -1 })
      .limit(10);

    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      totalPoints: user.totalPoints || 0
    }));

    res.status(200).json({ success: true, leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching leaderboard' });
  }
});

// GET group details by ID
router.get('/:groupId', userAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    // Check if user is a member
    const isMember = group.members.some(member => member.userId.toString() === req.userId);
    if (!isMember) {
      return res.status(403).json({ success: false, message: 'You are not a member of this group' });
    }

    res.status(200).json({ success: true, group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching group' });
  }
});

// LEAVE a group
router.post('/leave/:groupId', userAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    // Remove user from members
    group.members = group.members.filter(member => member.userId.toString() !== req.userId);

    // Delete group if no members left
    if (group.members.length === 0) {
      await Group.findByIdAndDelete(req.params.groupId);
      return res.status(200).json({ success: true, message: 'Group deleted as no members remain' });
    }

    await group.save();
    res.status(200).json({ success: true, message: 'Left group successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error leaving group' });
  }
});

export default router;